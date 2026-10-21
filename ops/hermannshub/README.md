# Hermannshub maintenance

Local operations dashboard for `andrew@192.168.178.44`. This belongs to the
andrewhermann-blog project and is separate from its public React application.
Nothing here is served by the production website.

Open **http://127.0.0.1:8788/** on this Mac. The local Python controller polls
health every five minutes and the HTML refreshes every four seconds. Sleeping
or offline Macs cannot collect samples. SSH uses the existing agent/key and
requires passwordless sudo for the listed actions; no password is saved here.

```sh
python3 ops/hermannshub/server.py
python3 ops/hermannshub/test_smoke.py
```

On a fresh checkout the queue starts paused. Resume it only when you intend to run
the listed maintenance actions. Reboot is always an explicit manual task.

A user LaunchAgent named `ch.cloudhopper.hermann-maintenance` keeps the controller
running and starts it at login. Its plist is installed locally under
`~/Library/LaunchAgents/`. Stop it with:

```sh
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/ch.cloudhopper.hermann-maintenance.plist
```

Pause the queue and let the active task finish before stopping the controller.
Restarting mid-operation marks the task as requiring attention rather than
silently running it twice. To start again:

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/ch.cloudhopper.hermann-maintenance.plist
```

## Controls and evidence

- Pause / Resume controls the next task; it never kills an active apt operation.
- Refresh health requests a read-only snapshot.
- View log shows task output. Run again queues a specific allowed task. Completed
  one-time runtime migration cannot be replayed; use Refresh health to verify it.
- A nonzero task exit pauses the queue. Read the log before resuming/retrying.
- Amber means remaining findings, account decisions, vendor dependencies, or
  tests awaiting results. It does not mean remediation is complete.

Only `127.0.0.1` is bound. Host validation, same-origin checks, and a generated
per-process request token protect control endpoints. Actions are a fixed list
of scripts; the API cannot accept arbitrary hosts, paths, or shell commands.
Browser-rendered logs and messages are escaped. Scripts and controller code
are trusted local code and should only be writable by this account. This is
not a multi-user administration service; do not expose it through a proxy.

Runtime state, health history, logs and any backup artifacts live in `.runtime/`,
which is ignored by git. Do not commit those records or server credentials.
The dashboard does not purchase subscriptions, attach Ubuntu Pro accounts,
reboot the server, or replace vendor snap binaries.

## Work started 21 October 2026

- nginx 1.30.2 → 1.30.6; system Node 22.22.2 → 22.23.4.
- NVM/application Node 22.22.1 → 22.23.4. PM2 saved process interpreters and its
  systemd PATH override were updated; both applications restarted and verified.
- Configuration backup: `/var/backups/hermann-maintenance/2026-10-21/config-before-high.tgz`
  on the server, readable by root only. Old NVM versions remain installed.
- GitHub CLI apt signing key refreshed using the published SHA-256 and full
  fingerprint, followed by strict repository signature verification.
- Ubuntu package updates, Nextcloud checks, disk short tests, ESM entitlement,
  dependency audit and backup evidence are separately tracked in the dashboard.
- Extra runner discovery: the latest inspected GitHub runner 2.338.0 still
  bundles Node 24.21.0, below the 24.22.1 security release. The runner task
  isolates the idle service pending a vendor patch and records the undo command.

## Rollback and limits

The nginx configuration and original service files are in the protected archive.
Restore individual configuration files deliberately, run `nginx -t`, and restart
only the affected service. Do not blindly unpack the whole archive onto `/`.
For the NVM migration, restore the old PM2 saved process configuration and remove
`/etc/systemd/system/pm2-andrew.service.d/maintenance-node.conf`, then reload
systemd and restart PM2. This restores the old vulnerable runtime and is an
emergency rollback, not the normal resolution. Package rollback requires the
appropriate signed package version; the archive is a configuration backup,
not a full system image.

ONLYOFFICE disable is reversible with `sudo nextcloud.occ app:enable onlyoffice`.
Runner isolation is reversible after a verified vendor fix with the exact
`systemctl enable --now` command in its log. Disk self-tests are non-destructive.
RAID and SMART passing do not prove a backup can be restored. Ubuntu ESM needs
an account entitlement; neither it nor off-server backup coverage is implied by
a green service-health card.

## Current application patch evidence

The dependency branch updates proxy-addr, path-to-regexp, tar, lodash and both ws
lines, and overrides pinned transitive compression/shell-quote to patched releases.
The same registry audit finds none of those priority packages vulnerable in the
candidate lockfile. Other findings remain, largely in the declared build chain;
these are not all reachable from the running static site. Full remediation is not
claimed. The application patch has not been deployed.

`npm run build` passes. Before and after the dependency changes, tests report
91 passes and one failure: `AdminLogin > shows network error when API throws`.
The failure is pre-existing and was not changed to make this patch appear green.
Dashboard smoke tests pass seven access/control checks. Python and shell syntax
checks and the exact inline JavaScript syntax check also pass.

The blog database and configuration snapshot were copied to this Mac under the
ignored private runtime directory. A separate SQLite restore passes integrity
checking and the configuration archive can be read. This is partial backup
evidence; full Nextcloud file and database restore coverage remains unverified.
