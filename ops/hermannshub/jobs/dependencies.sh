set -euo pipefail
python3 - <<'PY'
import json,urllib.request,subprocess,collections
path='/var/www/andrew/andrewhermann/package-lock.json'
lock=json.load(open(path));versions=collections.defaultdict(set)
for location,info in lock.get('packages',{}).items():
 if not location or info.get('dev') or not info.get('version'):continue
 if not str(info.get('resolved','')).startswith('https://registry.npmjs.org/'):continue
 name=info.get('name') or location.rsplit('node_modules/',1)[-1]
 versions[name].add(info['version'])
body={k:sorted(v) for k,v in versions.items()}
req=urllib.request.Request('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk',data=json.dumps(body).encode(),headers={'Content-Type':'application/json'},method='POST')
with urllib.request.urlopen(req,timeout=35) as response:advisories=json.load(response)
script="""const fs=require('fs'),semver=require('/usr/lib/node_modules/npm/node_modules/semver');const d=JSON.parse(fs.readFileSync(0,'utf8'));let result=[];for(const [name,ads] of Object.entries(d.advisories)){for(const a of ads){const installed=(d.versions[name]||[]).filter(v=>semver.satisfies(v,a.vulnerable_versions));if(installed.length)result.push({name,installed,severity:a.severity,title:a.title,url:a.url,range:a.vulnerable_versions});}}console.log(JSON.stringify(result,null,2));"""
r=subprocess.run(['/usr/bin/node','-e',script],input=json.dumps({'versions':body,'advisories':advisories}),capture_output=True,text=True,check=True,timeout=30)
findings=json.loads(r.stdout);print(json.dumps({'public_production_packages':len(body),'findings':findings},indent=2))
if findings:print('ATTENTION: production dependency advisories confirmed. Changes require a branch, application tests and verified deployment; no forced dependency upgrades applied.')
else:print('No production dependency advisories reported by the npm registry bulk endpoint.')
PY
