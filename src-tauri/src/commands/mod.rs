#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn spawn_pty(shell: &str, cwd: &str) -> Result<String, String> {
    println!("Spawning PTY with shell: {}, cwd: {}", shell, cwd);
    Ok("mock-pty-id".to_string())
}

#[tauri::command]
pub fn write_pty_input(id: &str, data: &str) -> Result<(), String> {
    println!("Writing data to PTY {}: {}", id, data);
    Ok(())
}

#[tauri::command]
pub fn resize_pty_session(id: &str, cols: u16, rows: u16) -> Result<(), String> {
    println!("Resizing PTY {} to {}x{}", id, cols, rows);
    Ok(())
}

#[tauri::command]
pub fn kill_pty_session(id: &str) -> Result<(), String> {
    println!("Killing PTY {}", id);
    Ok(())
}
