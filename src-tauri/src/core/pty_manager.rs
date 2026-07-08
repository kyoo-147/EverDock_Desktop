use crate::domain::pty::PtyManager as PtyManagerTrait;

pub struct PtyManager;

impl PtyManager {
    pub fn new() -> Self {
        PtyManager
    }
}

impl PtyManagerTrait for PtyManager {
    fn spawn_pty(&self, _shell: &str, _cwd: &str) -> Result<String, String> {
        Ok("mock-pty-id".to_string())
    }

    fn write_input(&self, _pty_id: &str, _data: &str) -> Result<(), String> {
        Ok(())
    }

    fn resize_pty(&self, _pty_id: &str, _cols: u16, _rows: u16) -> Result<(), String> {
        Ok(())
    }

    fn kill_pty(&self, _pty_id: &str) -> Result<(), String> {
        Ok(())
    }
}
