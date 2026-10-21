set -euo pipefail
backup=/var/backups/hermann-maintenance/2026-10-21
sudo install -d -m 700 "$backup"
if ! sudo test -f "$backup/config-before-high.tgz"; then
 sudo tar -czf "$backup/config-before-high.tgz" /etc/nginx /etc/systemd/system/hermann-tech.service /etc/systemd/system/pm2-andrew.service /home/andrew/.pm2/dump.pm2
fi
sudo chmod 600 "$backup/config-before-high.tgz"
dpkg-query -W nginx nodejs
sudo nginx -t
sudo env DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Lock::Timeout=120 -o Dpkg::Options::=--force-confold install -y --only-upgrade nginx nodejs
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl is-active nginx
node --version
dpkg --compare-versions "$(dpkg-query -W -f='${Version}' nodejs)" ge 22.23.4
export NVM_DIR=/home/andrew/.nvm
. "$NVM_DIR/nvm.sh"
nvm install 22.23.4
nvm alias default 22.23.4
export PATH=/home/andrew/.nvm/versions/node/v22.23.4/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
node /usr/lib/node_modules/pm2/bin/pm2 restart frontend backend-api --interpreter /home/andrew/.nvm/versions/node/v22.23.4/bin/node --update-env
node /usr/lib/node_modules/pm2/bin/pm2 save
sudo install -d /etc/systemd/system/pm2-andrew.service.d
printf '[Service]\nEnvironment="PATH=/home/andrew/.nvm/versions/node/v22.23.4/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"\n' | sudo tee /etc/systemd/system/pm2-andrew.service.d/maintenance-node.conf >/dev/null
sudo systemctl daemon-reload
sudo systemctl restart pm2-andrew
sudo systemctl restart hermann-tech
sleep 5
sudo systemctl is-active nginx pm2-andrew hermann-tech security-ingest snap.nextcloud.php-fpm
node /usr/lib/node_modules/pm2/bin/pm2 jlist | python3 -c 'import sys,json,subprocess; ps=json.load(sys.stdin); assert len(ps)==2; [(print(p["name"],p["pm2_env"]["status"],p["pm2_env"]["exec_interpreter"]),subprocess.run([p["pm2_env"]["exec_interpreter"],"--version"],check=True)) for p in ps]; assert all(p["pm2_env"]["status"]=="online" and "v22.23.4" in p["pm2_env"]["exec_interpreter"] for p in ps)'
for item in 5000:200 5001:404 5002:404 5080:302; do port=${item%:*}; expected=${item#*:}; actual=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 http://127.0.0.1:$port/); printf 'HTTP %s expected=%s actual=%s\n' "$port" "$expected" "$actual"; test "$actual" = "$expected"; done
sudo nginx -v
printf 'HIGH_PRIORITY_VERIFIED\n'
