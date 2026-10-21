#!/usr/bin/env python3
"""Loopback-only maintenance dashboard with a fixed remote action allowlist."""
import http.server,json,secrets,subprocess,threading,time,pathlib,os,sys,fcntl
ROOT=pathlib.Path(__file__).resolve().parent
RUNTIME=ROOT/'.runtime';RUNTIME.mkdir(exist_ok=True,mode=0o700);RUNTIME.chmod(0o700)
CONTROLLER_LOCK=(RUNTIME/'controller.lock').open('a')
try:fcntl.flock(CONTROLLER_LOCK,fcntl.LOCK_EX|fcntl.LOCK_NB)
except BlockingIOError:raise SystemExit('Maintenance controller already running')
LOGS=RUNTIME/'logs';LOGS.mkdir(exist_ok=True)
STATE=RUNTIME/'state.json';PORT=8788;HOST=f'127.0.0.1:{PORT}'
TOKEN=secrets.token_urlsafe(32);LOCK=threading.RLock();WAKE=threading.Event();CHECK=threading.Event()
SSH=['/usr/bin/ssh','-o','BatchMode=yes','-o','ConnectTimeout=8','-o','ServerAliveInterval=15','-o','ServerAliveCountMax=3','andrew@192.168.178.44']
TASKS=[('high','High','nginx + both Node.js runtimes'),('runner','High','GitHub Actions runner runtime'),('repos','Medium','Repair GitHub CLI signing key'),('updates','Medium','Install remaining package updates'),('nextcloud','Medium','Nextcloud integration and warnings'),('storage','Monitor','Disk self-tests and RAID'),('esm','Decision','Ubuntu ESM coverage'),('dependencies','Medium','Production dependency audit'),('backups','Monitor','Backup and restore evidence'),('reboot','Medium','Controlled server reboot')]
def save():
    tmp=STATE.with_suffix('.tmp');tmp.write_text(json.dumps(state,indent=2));tmp.chmod(0o600);tmp.replace(STATE)
def event(message):
    state['events'].append({'time':time.time(),'message':message});state['events']=state['events'][-500:]
if STATE.exists():state=json.loads(STATE.read_text())
else:
    state={'paused':True,'jobs':[{'id':i,'priority':p,'title':t,'status':'attention' if i=='reboot' else ('complete' if i=='high' and (LOGS/'high.log').exists() and 'HIGH_PRIORITY_VERIFIED' in (LOGS/'high.log').read_text(errors='replace') else 'queued'),'detail':'Verified nginx 1.30.6, Node 22.23.4; services and HTTP baseline passed.' if i=='high' else ''} for i,p,t in TASKS],'events':[],'health':{},'history':[]}
    event('Maintenance started. High-priority updates verified; configuration backup is on the server.')
for ident,priority,title in TASKS:
    if not any(j['id']==ident for j in state['jobs']):
        state['jobs'].insert(1 if ident=='runner' else len(state['jobs']),{'id':ident,'priority':priority,'title':title,'status':'attention' if ident=='reboot' else 'queued','detail':'Updates installed; run this task when a brief server outage is acceptable.' if ident=='reboot' else ''})
for j in state['jobs']:
    if j['status']=='running':j['status']='attention';j['detail']='Dashboard restarted during execution. Inspect log and server state before retrying.'
save()
def worker():
    while True:
        with LOCK:
            job=next((j for j in state['jobs'] if j['status']=='queued'),None) if not state['paused'] else None
            if job:job['status']='running';job['started']=time.time();job.pop('finished',None);job['detail']='Executing on server';event('Started: '+job['title']);save()
        if not job:WAKE.wait(2);WAKE.clear();continue
        path=ROOT/'jobs'/(job['id']+'.sh')
        log=LOGS/(job['id']+'.log')
        try:
            with log.open('ab') as f:
                offset=f.tell()
                f.write(('\n--- '+time.strftime('%Y-%m-%d %H:%M:%S %Z')+' ---\n').encode());f.flush()
                if job['id']=='reboot':
                    boot=subprocess.run(SSH+['cat','/proc/sys/kernel/random/boot_id'],capture_output=True,text=True,check=True,timeout=20)
                    (RUNTIME/'boot-before').write_text(boot.stdout.strip())
                with path.open('rb') as source:r=subprocess.run(SSH+['bash','-s'],stdin=source,stdout=f,stderr=subprocess.STDOUT,timeout=1800)
            if job['id']=='reboot' and r.returncode==0:
                old=(RUNTIME/'boot-before').read_text().strip() if (RUNTIME/'boot-before').exists() else ''
                for attempt in range(36):
                    time.sleep(10)
                    probe=subprocess.run(SSH+['cat','/proc/sys/kernel/random/boot_id'],capture_output=True,text=True,timeout=15)
                    if probe.returncode==0 and probe.stdout.strip()!=old:
                        services=subprocess.run(SSH+['sudo','-n','systemctl','is-active','--quiet','nginx','pm2-andrew','hermann-tech','security-ingest','snap.nextcloud.php-fpm'],capture_output=True,timeout=20)
                        http=subprocess.run(SSH+['curl','-fsS','--max-time','10','http://127.0.0.1:5080/status.php'],capture_output=True,timeout=20)
                        if services.returncode==0 and http.returncode==0:
                            with log.open('a') as f:f.write('Verified new boot ID, SSH recovery, web services and Nextcloud HTTP.\n')
                            break
                else:raise RuntimeError('Reboot recovery not verified within six minutes; inspect server console.')
            tail=log.read_bytes()[offset:].decode(errors='replace')[-8000:]
            status='complete' if r.returncode==0 else 'failed'
            if r.returncode==0 and 'ATTENTION:' in tail:status='attention'
            detail='Completed and verified.' if status=='complete' else (tail.rsplit('ATTENTION:',1)[-1].strip()[:800] if status=='attention' else f'Command exited {r.returncode}; queue paused.')
        except Exception as e:status='failed';detail=str(e)
        with LOCK:
            job['status']=status;job['detail']=detail;job['finished']=time.time()
            if status=='failed':state['paused']=True
            event(job['title']+': '+status);save()
        CHECK.set()
def monitor():
    while True:
        try:
            r=subprocess.run(SSH+['sudo','-n','python3','-'],input=(ROOT/'monitor.py').read_text(),capture_output=True,text=True,timeout=150)
            if r.returncode:raise RuntimeError(r.stderr[-400:])
            health=json.loads(r.stdout)
            with LOCK:
                previous=state.get('health',{})
                before=previous.get('disks',{}).get('sdc',{}).get('attributes',{}).get('Reallocated_Sector_Ct')
                after=health['disks']['sdc']['attributes'].get('Reallocated_Sector_Ct')
                if before is not None and after is not None and int(after)>int(before):event('Disk /dev/sdc reallocated sectors increased: '+str(before)+' to '+str(after))
                if previous.get('services') and previous['services']!=health['services']:event('Service state changed; inspect live health.')
                state['health']=health;state['history'].append({'time':health['time'],'services_ok':all(v=='active' for v in health['services'].values()),'disk_sdc':health['disks']['sdc']['attributes']});state['history']=state['history'][-2016:];state.pop('monitor_error',None);save()
        except Exception as e:
            with LOCK:state['monitor_error']=str(e);save()
        CHECK.wait(300);CHECK.clear()
class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def reply(self,code,data,kind='application/json'):
        body=data if isinstance(data,bytes) else json.dumps(data).encode()
        self.send_response(code);self.send_header('Content-Type',kind);self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('X-Frame-Options','DENY');self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; connect-src 'self'");self.end_headers();self.wfile.write(body)
    def do_GET(self):
        if self.headers.get('Host')!=HOST:return self.reply(403,{'error':'Invalid host'})
        if self.path=='/':return self.reply(200,(ROOT/'index.html').read_text().replace('__TOKEN__',TOKEN).encode(),'text/html; charset=utf-8')
        if self.path=='/api/state':
            with LOCK:
                snapshot=json.loads(json.dumps(state))
                evidence=RUNTIME/'evidence.json'
                if evidence.exists():snapshot['evidence']=json.loads(evidence.read_text())
                return self.reply(200,snapshot)
        if self.path.startswith('/api/log/'):
            ident=self.path.removeprefix('/api/log/')
            if ident not in {t[0] for t in TASKS}:return self.reply(404,{})
            p=LOGS/(ident+'.log');return self.reply(200,{'text':p.read_text(errors='replace')[-45000:] if p.exists() else 'No execution log yet.'})
        return self.reply(404,{})
    def do_POST(self):
        if self.headers.get('Host')!=HOST or self.headers.get('Origin')!='http://'+HOST or not secrets.compare_digest(self.headers.get('X-Maintenance-Token',''),TOKEN):return self.reply(403,{'error':'Invalid origin or token'})
        if self.headers.get('Content-Type')!='application/json':return self.reply(415,{})
        try:
            length=int(self.headers.get('Content-Length','0'))
            if length<0:return self.reply(400,{})
            if length>1024:return self.reply(413,{})
            data=json.loads(self.rfile.read(length))
        except Exception:return self.reply(400,{})
        with LOCK:
            if self.path=='/api/pause':state['paused']=True;event('Queue paused. Active package operation will finish safely.')
            elif self.path=='/api/resume':state['paused']=False;event('Queue resumed.');WAKE.set()
            elif self.path=='/api/refresh':CHECK.set()
            elif self.path=='/api/run':
                job=next((j for j in state['jobs'] if j['id']==data.get('id')),None)
                if not job or job['status'] in ['running','queued'] or (job['id']=='high' and job['status']=='complete'):return self.reply(409,{'error':'Unknown or already active task'})
                job['status']='queued';job['detail']='Queued by dashboard';event('Queued: '+job['title']);WAKE.set()
            else:return self.reply(404,{})
            save();self.reply(200,{'ok':True})
if __name__=='__main__':
    server=http.server.ThreadingHTTPServer(('127.0.0.1',PORT),Handler)
    threading.Thread(target=worker,daemon=True).start();threading.Thread(target=monitor,daemon=True).start()
    print(f'http://{HOST}/',flush=True);server.serve_forever()
