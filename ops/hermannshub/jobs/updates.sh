set -euo pipefail
sudo apt-get -o APT::Update::Error-Mode=any update -qq
sudo env DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Lock::Timeout=120 -o Dpkg::Options::=--force-confold upgrade -y --with-new-pkgs --no-remove
sudo nginx -t
sudo systemctl is-active nginx hermann-tech pm2-andrew security-ingest snap.nextcloud.php-fpm
sudo dpkg --audit
/usr/lib/update-notifier/apt-check --human-readable
if test -f /var/run/reboot-required; then echo 'ATTENTION: reboot required; no reboot performed'; fi
