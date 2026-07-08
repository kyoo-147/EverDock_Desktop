pub struct LocalTunnel;

impl LocalTunnel {
    pub fn new() -> Self {
        LocalTunnel
    }

    pub fn establish_tunnel(&self, _port: u16) -> Result<String, String> {
        Ok("https://tunnel.mock.everdock.dev".to_string())
    }

    pub fn close_tunnel(&self) -> Result<(), String> {
        Ok(())
    }
}
