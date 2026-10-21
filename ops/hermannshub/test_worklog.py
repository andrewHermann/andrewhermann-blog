"""Exercise failure recovery and cross-session handoff without GitHub writes."""
import pathlib
import tempfile
import unittest
import uuid
from unittest.mock import patch
import worklog


class FakeGitHub:
    def __init__(self):
        self.comments = {i: [] for i in worklog.ALLOWED}
        self.fail_after_accept = False
        self.fail_reads = False
        self.posts = 0

    def __call__(self, path, payload=None):
        number = int(path.split('/issues/')[1].split('/')[0])
        if payload:
            self.posts += 1
            item = {'body': payload['body'], 'html_url': 'https://github.com/example/comment/' + str(self.posts), 'user': {'login': 'operator'}}
            self.comments[number].append(item)
            if self.fail_after_accept:
                self.fail_after_accept = False
                raise RuntimeError('Network disconnected after write')
            return item
        if self.fail_reads:
            raise RuntimeError('GitHub unavailable')
        if '/comments' in path:
            return self.comments[number]
        return dict(number=number, title='Task', state='open', html_url='https://github.com/example/issues/'+str(number), body='Acceptance criteria', updated_at='2026-10-21T20:00:00Z')


def event():
    return dict(id=str(uuid.uuid4()), issue=99, status='in_progress', operator='test-session', summary='Captured baseline', evidence='Service state captured', next='Inspect timers', rollback='No changes', time='2026-10-21T20:00:00+00:00')


class WorklogTests(unittest.TestCase):
    def test_uncertain_write_recovers_without_duplicate(self):
        with tempfile.TemporaryDirectory() as directory:
            runtime = pathlib.Path(directory)
            original = event()
            worklog.append_event(runtime, original)
            api = FakeGitHub()
            api.fail_after_accept = True
            failed = worklog.sync(runtime, api)
            self.assertIn('error', failed)
            self.assertEqual(failed['pending'], 1)
            self.assertEqual(api.posts, 1)
            recovered = worklog.sync(runtime, api)
            self.assertNotIn('error', recovered)
            self.assertEqual(recovered['pending'], 0)
            self.assertEqual(api.posts, 1)
            self.assertEqual(recovered['events'][0]['id'], original['id'])

    def test_offline_retains_local_event(self):
        with tempfile.TemporaryDirectory() as directory:
            runtime = pathlib.Path(directory)
            original = event()
            worklog.append_event(runtime, original)
            api = FakeGitHub()
            api.fail_reads = True
            failed = worklog.sync(runtime, api)
            self.assertEqual(failed['pending'], 1)
            self.assertIn(original['id'], (runtime/'worklog.jsonl').read_text())
            self.assertEqual(api.posts, 0)
            api.fail_reads = False
            self.assertEqual(worklog.sync(runtime, api)['pending'], 0)
            self.assertEqual(api.posts, 1)

    def test_fresh_machine_imports_remote_progress(self):
        with tempfile.TemporaryDirectory() as directory:
            api = FakeGitHub()
            original = event()
            api.comments[99].append({'body':worklog.comment(original), 'html_url':'https://github.com/example/comment/1','user':{'login':'other-session'}})
            snapshot = worklog.sync(pathlib.Path(directory), api)
            self.assertEqual(snapshot['events'][0]['operator'], original['operator'])
            self.assertEqual(snapshot['events'][0]['github_author'], 'other-session')
            self.assertEqual(api.posts, 0)
            self.assertEqual(len(snapshot['issues']), 4)

    def test_marker_rejects_wrong_issue_and_malformed_data(self):
        body = worklog.comment(event())
        self.assertIsNone(worklog.decode(body, 100))
        self.assertIsNone(worklog.decode('<!-- hermann-worklog:invalid -->', 99))
        self.assertIsNone(worklog.decode('ordinary comment', 99))

    def test_record_is_local_before_network(self):
        with tempfile.TemporaryDirectory() as directory:
            runtime=pathlib.Path(directory)
            arguments=['worklog.py','record','--issue','99','--status','planned','--operator','session','--summary','Plan','--evidence','Issue body','--next','Read','--rollback','None']
            def check_saved(path):
                self.assertEqual(len((runtime/'worklog.jsonl').read_text().splitlines()),1)
                return {'pending':1,'error':'offline'}
            with patch.object(worklog,'RUNTIME',runtime), patch('sys.argv',arguments), patch.object(worklog,'sync',side_effect=check_saved):
                with self.assertRaises(SystemExit) as stopped:worklog.main()
                self.assertEqual(stopped.exception.code,1)


if __name__ == '__main__':
    unittest.main()
