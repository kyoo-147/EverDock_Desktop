// Define module architecture
pub mod core;
pub mod adapters;
pub mod storage;
pub mod security;
pub mod remote;
pub mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::spawn_pty,
            commands::write_pty_input,
            commands::resize_pty_session,
            commands::kill_pty_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
