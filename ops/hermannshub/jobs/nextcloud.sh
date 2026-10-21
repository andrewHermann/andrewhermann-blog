set -euo pipefail
configured=$(sudo /snap/bin/nextcloud.occ config:app:get onlyoffice DocumentServerUrl || true)
if test -z "$configured"; then
 sudo /snap/bin/nextcloud.occ app:disable onlyoffice
 echo 'Disabled unconfigured ONLYOFFICE integration. Undo: sudo nextcloud.occ app:enable onlyoffice'
else
 echo 'ONLYOFFICE is configured; preserving integration.'
fi
sudo /snap/bin/nextcloud.occ status --output=json
sudo /snap/bin/nextcloud.occ integrity:check-core --output=json
curl -fsS --max-time 15 http://127.0.0.1:5080/status.php
printf '\nApache AH02155 is also reported upstream: https://github.com/nextcloud-snap/nextcloud-snap/issues/3437\n'
echo 'ATTENTION: vendor Apache UID warning remains tracked; snap binaries/config not modified.'
