use crate::domain::remote::LocalTunnel as LocalTunnelTrait;

pub struct LocalTunnel;

impl LocalTunnel {
    pub fn new() -> Self {
        LocalTunnel
    }
}

impl LocalTunnelTrait for LocalTunnel {
    fn establish_tunnel(&self, _port: u16) -> Result<String, String> {
        Ok("https://tunnel.mock.everdock.dev".to_string())
    }

    fn close_tunnel(&self) -> Result<(), String> {
        Ok(())
    }
}
