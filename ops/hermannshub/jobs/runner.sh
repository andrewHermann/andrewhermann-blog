set -euo pipefail
service=actions.runner.andrewHermann-andrewhermann-blog.hermannshub.service
if pgrep -x Runner.Worker >/dev/null; then
 echo 'ATTENTION: runner has an active job; isolation deferred until that job finishes.'
 exit 0
fi
/home/andrew/actions-runner/bin/Runner.Listener --version
# Latest official vendor package checked on 2026-10-21: runner 2.338.0
# bundles Node 24.21.0, older than today's fixed 24.22.1. Keep vendor
# executables intact and isolate this optional workload pending a fixed bundle.
sudo systemctl disable --now "$service"
if sudo systemctl is-active --quiet "$service"; then echo 'Runner did not stop'; exit 1; fi
printf 'ATTENTION: idle self-hosted runner stopped and disabled pending a vendor package with patched Node. Web applications remain online.\n'
echo 'After a verified vendor update, undo isolation: sudo systemctl enable --now actions.runner.andrewHermann-andrewhermann-blog.hermannshub.service'
