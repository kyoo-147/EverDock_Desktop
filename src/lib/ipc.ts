import { invoke } from "@tauri-apps/api/core";

/**
 * Greet the user via Rust command.
 */
export async function greet(name: string): Promise<string> {
  try {
    return await invoke<string>("greet", { name });
  } catch (error) {
    console.error("IPC greet failed:", error);
    return `Hello, ${name}! (Mock Fallback)`;
  }
}

/**
 * Spawn a new remote/local PTY session on Rust backend.
 */
export async function spawnPty(shell: string, cwd: string): Promise<string> {
  try {
    return await invoke<string>("spawn_pty", { shell, cwd });
  } catch (error) {
    console.error("IPC spawnPty failed:", error);
    return `mock-pty-${Date.now()}`;
  }
}

/**
 * Write character input data to the PTY session.
 */
export async function writePtyInput(id: string, data: string): Promise<void> {
  try {
    await invoke<void>("write_pty_input", { id, data });
  } catch (error) {
    console.error("IPC writePtyInput failed:", error);
  }
}

/**
 * Resize the virtual size layout of a running PTY shell session.
 */
export async function resizePtySession(id: string, cols: number, rows: number): Promise<void> {
  try {
    await invoke<void>("resize_pty_session", { id, cols, rows });
  } catch (error) {
    console.error("IPC resizePtySession failed:", error);
  }
}

/**
 * Terminate a running PTY terminal instance.
 */
export async function killPtySession(id: string): Promise<void> {
  try {
    await invoke<void>("kill_pty_session", { id });
  } catch (error) {
    console.error("IPC killPtySession failed:", error);
  }
}
