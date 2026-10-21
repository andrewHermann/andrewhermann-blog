import unittest
from reconcile import runner_is_isolated

class RunnerIsolation(unittest.TestCase):
    def setUp(self):
        self.proof={'service':'inactive','enabled':'disabled','listener_present':False,'worker_present':False}
    def test_verified_isolation_closes_exposure(self):
        self.assertTrue(runner_is_isolated(self.proof))
    def test_reenabled_service_reopens_exposure(self):
        self.proof['enabled']='enabled';self.assertFalse(runner_is_isolated(self.proof))
    def test_manual_listener_reopens_exposure(self):
        self.proof['listener_present']=True;self.assertFalse(runner_is_isolated(self.proof))
    def test_active_worker_prevents_closure(self):
        self.proof['worker_present']=True;self.assertFalse(runner_is_isolated(self.proof))
    def test_missing_evidence_is_not_treated_as_safe(self):
        for key in self.proof:
            partial=self.proof.copy();del partial[key];self.assertFalse(runner_is_isolated(partial))
if __name__=='__main__':unittest.main()
