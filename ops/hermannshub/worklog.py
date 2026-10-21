#!/usr/bin/env python3
"""Durable local-first progress journal, mirrored through authenticated gh CLI."""
import argparse
import base64
import datetime
import fcntl
import json
import os
import pathlib
import re
import subprocess
import uuid

ROOT = pathlib.Path(__file__).resolve().parent
MANIFEST = json.loads((ROOT / 'workplan.json').read_text())
RUNTIME = ROOT / '.runtime'
ALLOWED = {MANIFEST['parent'], *(t['issue'] for t in MANIFEST['tasks'])}
STATUSES = ('planned', 'in_progress', 'blocked', 'verified', 'handoff')
MARKER = re.compile(r'<!-- hermann-worklog:([A-Za-z0-9_-]+) -->')


def atomic(path, value):
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(value, indent=2))
    temporary.chmod(0o600)
    temporary.replace(path)


def gh(path, payload=None):
    command = ['/opt/homebrew/bin/gh', 'api', path]
    if payload is not None:
        command += ['--method', 'POST', '--input', '-']
    else:
        command += ['--paginate', '--slurp']
    result = subprocess.run(command, input=json.dumps(payload) if payload else None,
                            text=True, capture_output=True, timeout=35)
    if result.returncode:
        raise RuntimeError('GitHub API request failed; check gh authentication/network locally')
    value = json.loads(result.stdout)
    if payload is not None:
        return value
    return [item for page in value for item in page] if value and isinstance(value[0], list) else value[0]


def decode(body, issue):
    match = MARKER.search(body or '')
    if not match:
        return None
    try:
        encoded = match[1]
        event = json.loads(base64.urlsafe_b64decode(encoded + '=' * (-len(encoded) % 4)))
        uuid.UUID(event['id'])
        if event['issue'] != issue or event['status'] not in STATUSES:
            return None
        for key in ('operator', 'summary', 'evidence', 'next', 'rollback', 'time'):
            if not isinstance(event[key], str) or len(event[key]) > 4000:
                return None
        datetime.datetime.fromisoformat(event['time'])
        return event
    except (ValueError, KeyError, TypeError):
        return None


def comment(event):
    marker = base64.urlsafe_b64encode(json.dumps(event).encode()).decode().rstrip('=')
    return ('### Maintenance progress: ' + event['status'] + '\n\n' +
            '\n\n'.join('**' + label + ':** ' + event[key] for label, key in (
                ('Operator/session', 'operator'), ('UTC', 'time'), ('Action/result', 'summary'),
                ('Evidence', 'evidence'), ('Rollback impact', 'rollback'), ('Next step', 'next'))) +
            '\n\n<!-- hermann-worklog:' + marker + ' -->')


def append_event(runtime, event):
    with (runtime / 'worklog.jsonl').open('a') as journal:
        os.chmod(journal.name, 0o600)
        journal.write(json.dumps(event) + '\n')
        journal.flush()
        os.fsync(journal.fileno())


def sync(runtime, api=gh):
    snapshot_path = runtime / 'github-workplan.json'
    snapshot = json.loads(snapshot_path.read_text()) if snapshot_path.exists() else {}
    journal_path = runtime / 'worklog.jsonl'
    events = [json.loads(line) for line in journal_path.read_text().splitlines()] if journal_path.exists() else []
    confirmed = {e['id'] for e in snapshot.get('events', [])}
    try:
        issues, remote_events = [], []
        prefix = 'repos/' + MANIFEST['repository'] + '/issues/'
        for number in sorted(ALLOWED):
            issue = api(prefix + str(number))
            comments = api(prefix + str(number) + '/comments?per_page=100')
            issues.append({key: issue[key] for key in ('number', 'title', 'state', 'html_url', 'body', 'updated_at')})
            for entry in comments:
                event = decode(entry.get('body'), number)
                if event:
                    event['url'] = entry['html_url']
                    event['github_author'] = entry['user']['login']
                    remote_events.append(event)
        confirmed = {e['id'] for e in remote_events}
        for event in events:
            if event['id'] in confirmed:
                continue
            result = api(prefix + str(event['issue']) + '/comments', {'body': comment(event)})
            remote_events.append({**event, 'url': result['html_url'], 'github_author': result['user']['login']})
            confirmed.add(event['id'])
            # Persist each acknowledgement before continuing; retries also inspect remote IDs.
            snapshot = {**snapshot, 'events': remote_events,
                        'pending': sum(e['id'] not in confirmed for e in events)}
            atomic(snapshot_path, snapshot)
        snapshot = {'issues': issues, 'events': remote_events, 'synced_at': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'pending': 0}
    except Exception as error:
        snapshot['error'] = str(error) if isinstance(error, RuntimeError) else type(error).__name__ + ': synchronization interrupted'
        snapshot['pending'] = sum(e['id'] not in confirmed for e in events)
    atomic(snapshot_path, snapshot)
    return snapshot


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    commands.add_parser('sync')
    record = commands.add_parser('record')
    record.add_argument('--issue', type=int, choices=sorted(ALLOWED), required=True)
    record.add_argument('--status', choices=STATUSES, required=True)
    for field in ('operator', 'summary', 'evidence', 'next', 'rollback'):
        record.add_argument('--' + field, required=True)
    args = parser.parse_args()
    if args.command == 'record':
        for field in ('operator', 'summary', 'evidence', 'next', 'rollback'):
            if not 1 <= len(getattr(args, field).strip()) <= 4000:
                parser.error(field + ' must contain 1–4000 characters')
    RUNTIME.mkdir(exist_ok=True, mode=0o700)
    RUNTIME.chmod(0o700)
    with (RUNTIME / 'worklog.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if args.command == 'record':
            event = {key: value for key, value in vars(args).items() if key != 'command'}
            event.update(id=str(uuid.uuid4()), time=datetime.datetime.now(datetime.timezone.utc).isoformat())
            append_event(RUNTIME, event)
        result = sync(RUNTIME)
    print(json.dumps({key: result.get(key) for key in ('synced_at', 'pending', 'error')}))
    raise SystemExit(1 if result.get('error') else 0)


if __name__ == '__main__':
    main()
