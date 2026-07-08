pub struct SessionManager;

impl SessionManager {
    pub fn new() -> Self {
        SessionManager
    }

    pub fn start_session(&self, _agent_id: &str, _workspace_id: &str) -> Result<String, String> {
        Ok("mock-session-id".to_string())
    }

    pub fn stop_session(&self, _session_id: &str) -> Result<(), String> {
        Ok(())
    }
}
