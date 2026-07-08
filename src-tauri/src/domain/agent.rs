pub trait AgentRuntime: Send + Sync {
    fn execute_prompt(&self, agent_name: &str, prompt: &str) -> Result<String, String>;
    fn get_capabilities(&self, agent_name: &str) -> Vec<String>;
}
