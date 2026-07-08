pub struct ApprovalEngine;

impl ApprovalEngine {
    pub fn new() -> Self {
        ApprovalEngine
    }

    pub fn request_approval(&self, _action_type: &str, _risk_level: &str, _details: &str) -> bool {
        // In local-first stub, returns true or triggers UI gate
        true
    }

    pub fn check_permission(&self, _agent_id: &str, _action: &str) -> bool {
        true
    }
}
