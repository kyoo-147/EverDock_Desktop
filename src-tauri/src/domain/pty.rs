pub trait PtyManager: Send + Sync {
    fn spawn_pty(&self, shell: &str, cwd: &str) -> Result<String, String>;
    fn write_input(&self, pty_id: &str, data: &str) -> Result<(), String>;
    fn resize_pty(&self, pty_id: &str, cols: u16, rows: u16) -> Result<(), String>;
    fn kill_pty(&self, pty_id: &str) -> Result<(), String>;
}
