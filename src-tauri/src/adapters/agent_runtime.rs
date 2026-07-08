pub struct AgentRuntime;

impl AgentRuntime {
    pub fn new() -> Self {
        AgentRuntime
    }

    pub fn execute_prompt(&self, _agent_name: &str, _prompt: &str) -> Result<String, String> {
        Ok("Mock response from agent".to_string())
    }

    pub fn get_capabilities(&self, _agent_name: &str) -> Vec<String> {
        vec!["read_files".to_string(), "write_files".to_string(), "bash".to_string()]
    }
}
