# Server containment and recovery handoff

Shared workplan: [#98](https://github.com/andrewHermann/andrewhermann-blog/issues/98).

| Order | GitHub issue | Acceptance evidence |
| --- | --- | --- |
| 1 | [#99 — Pause Nextcloud](https://github.com/andrewHermann/andrewhermann-blog/issues/99) | Web/PHP/background jobs stopped, restart policy controlled, captured rollback states |
| 2 | [#100 — LAN ingress](https://github.com/andrewHermann/andrewhermann-blog/issues/100) | Fresh LAN SSH works; independent public IPv4/IPv6 checks confirm isolation; update access works |
| 3 | [#101 — Trust and recovery](https://github.com/andrewHermann/andrewhermann-blog/issues/101) | Actual outbound TLS clients verified, contained reboot recovered, independent Nextcloud restore tested, reopening decision recorded |

All three are high priority. Read the full issue bodies and latest comments before
working: they contain the detailed acceptance and rollback requirements. This plan
has **not executed containment**. At creation the website/API/Nextcloud were up;
the Actions runner was isolated. Obtain an instruction to execute containment
before stopping services or changing ingress. Production deployment is a separate
explicit instruction under repository AGENTS.md.

The 24/48-hour review window begins with verified containment, never issue
creation. Time passing does not reopen services. Public reopening needs the
owner's explicit instruction and the issue #101 acceptance gate.

## Every session starts here

1. Read #98–#101 including comments, then run the sync below and inspect the
   dashboard at http://127.0.0.1:8788/. Check its GitHub timestamp and pending count.
2. Read any active claim. Record operator/session, intended scope, and next action
   with `status in_progress`; sync and reread GitHub for competing claims. Claims
   are cooperative records, not an atomic distributed lock. Do not mutate network,
   snap, or reboot state concurrently. Investigate stale claims and explicitly
   hand over ownership before continuing.
3. Record a sanitized update before and after each change, verification, blocker,
   or handoff. Use `blocked` for missing evidence/access/vendor fixes and `handoff`
   when leaving the task. Include exact next action and rollback impact.
4. Use `verified` only with acceptance evidence; it records a claim and does not
   automatically close the issue. Close only after all acceptance checks pass,
   both logs agree, and dependencies are verified. Parent closure also requires
   the reopening decision. Update the GitHub checklists as evidence is completed.

Run from the repository root; requires authenticated `/opt/homebrew/bin/gh`:

```sh
python3 ops/hermannshub/worklog.py sync
python3 ops/hermannshub/worklog.py record \
  --issue 99 --operator 'Andrew / session-identifier' --status in_progress \
  --summary 'Claimed Nextcloud containment; capturing service states before change.' \
  --evidence 'No changes yet; review issue acceptance checks and fresh server state.' \
  --rollback 'No availability changes; capture exact prior states before stopping.' \
  --next 'Capture snap services, timers and external cron jobs; check for competing claims.'
```

The example records a claim; do not run it without intending to own that task.
Allowed statuses: `planned`, `in_progress`, `blocked`, `verified`, `handoff`.
Allowed destinations: #98–#101 only. Never put passwords, tokens, raw security logs,
configuration archives, database content, or personal documents in these fields.
The command publishes precisely the supplied fields as a GitHub issue comment.

## Persistence and failure recovery

Each record is fsynced to private ignored `.runtime/worklog.jsonl` **before** any
network write. GitHub receives a readable comment plus a structured event marker.
The dashboard merges local pending records and remote events, displays operator,
status, evidence, rollback, next step, and pending/stale/sync failure indicators.

The controller syncs every five minutes while this Mac is awake; **Sync GitHub**
requests another sync. Records from other machines are recovered from GitHub
comments, so an ignored local file is never the only shared handoff. The dashboard
also mirrors issue bodies/state and fetches all comments on each sync. Plain
GitHub comments remain visible on GitHub; use this CLI for structured dashboard
updates. Read native comments too before acting. Do not edit/delete the structured
marker; append a correction or a newer update instead.

If GitHub fails, the command returns nonzero and retains the local outbox. Fix
connectivity/authentication, run `sync`, and verify pending=0 and a fresh timestamp
before claiming both records are updated. Retries first read remote event IDs,
preventing duplicate comments after an uncertain response. Local writes/sync are
serialized with a file lock. A crashed partial journal line needs operator repair
from its protected copy; no automatic deletion of evidence occurs. GitHub access
failure on a new machine cannot prove that no other operator owns the work.

## Known execution traps and remaining evidence

- Nextcloud's application CA bundle still included emSign ECC Root CA - G3 at the
  baseline check. Host package and Node trust had already been updated. Verify
  each actual client, including separate snap/certifi/renewal paths. Ingress
  restrictions alone do not repair outbound trust. Use supported updates or a
  tested supported override; never disable TLS verification or edit read-only snaps.
- Existing dashboard **Reboot server** verification expects Nextcloud active.
  Adapt it to the containment state under #101 before using it; do not enable
  Nextcloud just to satisfy that old health check. Active-service counts during
  deliberate containment need interpretation against the recorded desired state.
- Full Nextcloud database/files/config/keys restore on an independent destination
  is unverified. Blog SQLite restore and readable configuration archive are partial
  evidence only. Do not upload backup content to this repository.
- Runner vendor patch, Ubuntu ESM entitlement, residual dependency advisories, and
  disk sector monitoring remain tracked. Runner isolation is mitigation, not a
  patched vendor binary. Recheck vendor guidance during the containment window.
- External IPv4/IPv6 vantage and Cloudflare/router/tunnel inventory are required
  for ingress proof. A local curl or a cached CDN response cannot establish it.
- Preserve a second tested LAN SSH session and a tested narrow rollback before
  changing firewall exposure. Capture exact prior rules and service states.

Protected baseline backups are on the server at
`/var/backups/hermann-maintenance/2026-10-21/`. Do not publish their contents.

## Local implementation checks

```sh
python3 -m unittest discover -s ops/hermannshub -p 'test_worklog.py'
python3 ops/hermannshub/test_smoke.py
```

Dashboard source is separate from the production web application. A source PR
and a local dashboard reload do not deploy or contain the server.
