"""Exercise the running loopback API without executing maintenance jobs."""
import unittest,urllib.request,urllib.error,json,re,http.client
BASE='http://127.0.0.1:8788'
class DashboardSmoke(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.page=urllib.request.urlopen(BASE).read().decode()
        cls.token=re.search(r"const token='([^']+)'",cls.page)[1]
    def post(self,path,origin=None,token=None,body=b'{}',ctype='application/json'):
        headers={'Content-Type':ctype}
        if origin:headers['Origin']=origin
        if token:headers['X-Maintenance-Token']=token
        try:return urllib.request.urlopen(urllib.request.Request(BASE+path,body,headers,method='POST')).status
        except urllib.error.HTTPError as e:
            code=e.code;e.close();return code
    def test_health_snapshot_endpoint(self):
        d=json.load(urllib.request.urlopen(BASE+'/api/state'));self.assertGreaterEqual(len(d['jobs']),8)
        self.assertIn('paused',d);self.assertIn('health',d)
    def test_cross_site_cannot_control_server(self):
        self.assertEqual(self.post('/api/pause','https://example.com',self.token),403)
    def test_missing_token_cannot_control_server(self):
        self.assertEqual(self.post('/api/pause',BASE),403)
    def test_unknown_job_is_rejected(self):
        self.assertEqual(self.post('/api/run',BASE,self.token,b'{"id":"../../etc/passwd"}'),409)
    def test_host_validation(self):
        c=http.client.HTTPConnection('127.0.0.1',8788);c.request('GET','/api/state',headers={'Host':'evil.example'});self.assertEqual(c.getresponse().status,403);c.close()
    def test_log_traversal_rejected(self):
        with self.assertRaises(urllib.error.HTTPError) as cm:urllib.request.urlopen(BASE+'/api/log/../../etc/passwd')
        self.assertEqual(cm.exception.code,404);cm.exception.close()
    def test_refresh_accepts_same_origin_token(self):
        self.assertEqual(self.post('/api/refresh',BASE,self.token),200)
if __name__=='__main__':unittest.main()
