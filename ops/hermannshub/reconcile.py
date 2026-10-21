"""Evidence rules for closing exposure without claiming vulnerable code is patched."""
def runner_is_isolated(evidence):
    return (evidence.get('service') == 'inactive'
            and evidence.get('enabled') == 'disabled'
            and evidence.get('listener_present') is False
            and evidence.get('worker_present') is False)
