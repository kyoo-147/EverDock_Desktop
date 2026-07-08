use crate::domain::remote::SshConnection as SshConnectionTrait;

pub struct SshConnection;

impl SshConnection {
    pub fn new() -> Self {
        SshConnection
    }
}

impl SshConnectionTrait for SshConnection {
    fn connect(&self, _host: &str, _username: &str) -> Result<(), String> {
        Ok(())
    }

    fn execute_remote_command(&self, _cmd: &str) -> Result<String, String> {
        Ok("mock remote stdout".to_string())
    }
}
