pub struct SshConnection;

impl SshConnection {
    pub fn new() -> Self {
        SshConnection
    }

    pub fn connect(&self, _host: &str, _username: &str) -> Result<(), String> {
        Ok(())
    }

    pub fn execute_remote_command(&self, _cmd: &str) -> Result<String, String> {
        Ok("mock remote stdout".to_string())
    }
}
