set -euo pipefail
sudo python3 - <<'PY'
import sqlite3,pathlib,os
root=pathlib.Path('/var/backups/hermann-maintenance/2026-10-21');root.mkdir(parents=True,exist_ok=True,mode=0o700)
source='/var/www/andrew/andrewhermann/backend/blog.db'
with sqlite3.connect('file:'+source+'?mode=ro',uri=True) as src, sqlite3.connect(root/'blog.db') as dst:
 src.backup(dst);result=dst.execute('pragma integrity_check').fetchone()[0];assert result=='ok';print('Consistent blog SQLite snapshot: integrity_check='+result)
os.chmod(root/'blog.db',0o600)
PY
sudo ls -lh /var/backups/hermann-maintenance/2026-10-21
sudo find /var/backups /home/andrew/backups /mnt /media -maxdepth 3 -type f \( -name '*.tgz' -o -name '*.tar.gz' -o -name '*.sql.gz' -o -name '*.backup' \) -printf '%TY-%Tm-%Td %s %p\n' 2>/dev/null | tail -20 || true
sudo crontab -l 2>/dev/null | grep -Ei 'backup|rsync|borg|restic|duplicity' || true
systemctl list-timers --all --no-pager | grep -Ei 'backup|borg|restic|duplicity' || true
echo 'ATTENTION: blog snapshot is consistent. Full Nextcloud files/database off-server backup and restore verification remain required; no bulk data copied.'
