pub struct PtyManager;

impl PtyManager {
    pub fn new() -> Self {
        PtyManager
    }

    pub fn spawn_pty(&self, _shell: &str, _cwd: &str) -> Result<String, String> {
        Ok("mock-pty-id".to_string())
    }

    pub fn write_input(&self, _pty_id: &str, _data: &str) -> Result<(), String> {
        Ok(())
    }

    pub fn resize_pty(&self, _pty_id: &str, _cols: u16, _rows: u16) -> Result<(), String> {
        Ok(())
    }

    pub fn kill_pty(&self, _pty_id: &str) -> Result<(), String> {
        Ok(())
    }
}
