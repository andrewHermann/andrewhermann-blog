"""Copy the prepared protected snapshots to this Mac and verify a restore."""
import pathlib,subprocess,sqlite3,tarfile,hashlib,json,os,time
root=pathlib.Path(__file__).resolve().parent;dest=root/'.runtime/backups';dest.mkdir(mode=0o700,exist_ok=True);dest.chmod(0o700)
for name in ['blog.db','config-before-high.tgz']:
    p=dest/name
    with p.open('wb') as f:
        p.chmod(0o600)
        subprocess.run(['/usr/bin/ssh','-o','BatchMode=yes','-o','ConnectTimeout=8','andrew@192.168.178.44','sudo','-n','cat','/var/backups/hermann-maintenance/2026-10-21/'+name],stdout=f,check=True,timeout=40)
with sqlite3.connect(dest/'blog.db') as source,sqlite3.connect(dest/'restore-check.db') as restored:
    source.backup(restored);assert restored.execute('pragma integrity_check').fetchone()[0]=='ok'
    tables=restored.execute("select count(*) from sqlite_master where type='table'").fetchone()[0]
(dest/'restore-check.db').chmod(0o600)
with tarfile.open(dest/'config-before-high.tgz') as t:
    members=t.getnames();assert 'etc/nginx/nginx.conf' in members
result={'time':time.time(),'sqlite_restored':True,'tables':tables,'archive_members':len(members),'sha256':{n:hashlib.sha256((dest/n).read_bytes()).hexdigest() for n in ['blog.db','config-before-high.tgz']},'remaining':'Full Nextcloud data/database off-server restore coverage unverified.'}
(root/'.runtime/backups/verification.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
