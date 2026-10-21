set -euo pipefail
if pgrep -x apt-get >/dev/null || pgrep -x dpkg >/dev/null || pgrep -x Runner.Worker >/dev/null; then
 echo 'A package operation or runner job is active; refusing reboot.'; exit 1
fi
sudo nginx -t
sudo systemctl is-enabled ssh nginx pm2-andrew hermann-tech snap.nextcloud.php-fpm
sudo systemd-run --unit=hermann-maintenance-reboot --on-active=5s /usr/sbin/reboot
echo 'Scheduled server reboot. Controller will verify SSH recovery and a new boot ID.'
