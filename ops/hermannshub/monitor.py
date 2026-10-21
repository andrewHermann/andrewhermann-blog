"""Read-only snapshot; sent to the server over SSH by the local dashboard."""
import json, subprocess, time, pathlib, re

def run(args, timeout=15):
    try:
        p=subprocess.run(args,capture_output=True,text=True,timeout=timeout)
        return p.stdout.strip() or p.stderr.strip()
    except Exception as e:return str(e)

out={'time':time.time(),'hostname':run(['hostname']),'versions':{},'services':{},'http':{},'disks':{}}
for key,cmd in {'nginx':['nginx','-v'],'system_node':['/usr/bin/node','--version'],'php':['/snap/nextcloud/current/bin/php-fpm','-v']}.items():
    if key=='php':
        cmd=['env','LD_LIBRARY_PATH=/snap/nextcloud/current/lib:/snap/nextcloud/current/usr/lib:/snap/nextcloud/current/usr/lib/x86_64-linux-gnu:/snap/nextcloud/current/lib/x86_64-linux-gnu']+cmd
    out['versions'][key]=run(cmd).split('\n')[0]
for name in ['nginx','pm2-andrew','hermann-tech','security-ingest','snap.nextcloud.php-fpm']:
    out['services'][name]=run(['systemctl','is-active',name])
for port in [5000,5001,5002,5080]:out['http'][str(port)]=run(['curl','-s','-o','/dev/null','-w','%{http_code}','--max-time','5',f'http://127.0.0.1:{port}/'])
for disk in ['sda','sdb','sdc']:
    raw=run(['smartctl','-A','-H','-l','selftest','/dev/'+disk]);attrs={}
    for line in raw.splitlines():
        fields=line.split()
        if fields and fields[0] in ['5','197','198','199']:attrs[fields[1]]=fields[-1]
    out['disks'][disk]={'attributes':attrs,'selftests':[s.strip() for s in raw.splitlines() if re.match(r'^#\s*\d+',s)][:3],'passed':'PASSED' in raw}
out['raid']=run(['cat','/proc/mdstat']);out['disk_usage']=run(['df','-h','/'])
out['reboot_required']=pathlib.Path('/var/run/reboot-required').exists()
out['updates']=run(['/usr/lib/update-notifier/apt-check','--human-readable'],25)
out['failed_services']=run(['systemctl','--failed','--no-legend','--no-pager'])
# Inspect process executables without returning command arguments or environment secrets.
out['node_processes']=[]
for proc in pathlib.Path('/proc').iterdir():
    if proc.name.isdigit():
        try:
            exe=(proc/'exe').resolve()
            if exe.name=='node':out['node_processes'].append({'pid':int(proc.name),'executable':str(exe),'version':run([str(exe),'--version'])})
        except (OSError,RuntimeError):pass
out['nextcloud']=run(['curl','-fsS','--max-time','5','http://127.0.0.1:5080/status.php'])
print(json.dumps(out))
