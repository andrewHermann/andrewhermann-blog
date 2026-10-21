set -euo pipefail
python3 - <<'PY'
import json,urllib.request
with urllib.request.urlopen('https://api.github.com/repos/actions/runner/releases/latest',timeout=20) as response:d=json.load(response)
print('Latest official runner:',d['tag_name'])
for a in d.get('assets',[]):
 if 'linux-x64' in a['name']:print(a['name'],a.get('digest'))
print('ATTENTION: runner exposure is isolated. Vendor bundle patching remains a separate follow-up; verify its embedded Node runtime before re-enabling.')
PY
