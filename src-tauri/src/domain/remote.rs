pub trait SshConnection: Send + Sync {
    fn connect(&self, host: &str, username: &str) -> Result<(), String>;
    fn execute_remote_command(&self, cmd: &str) -> Result<String, String>;
}

pub trait RemoteRunner: Send + Sync {
    fn start_runner(&self) -> Result<(), String>;
    fn get_status(&self) -> String;
}

pub trait LocalTunnel: Send + Sync {
    fn establish_tunnel(&self, port: u16) -> Result<String, String>;
    fn close_tunnel(&self) -> Result<(), String>;
}
