mod player_server;
use tauri::command;

#[command]
fn test_ipc_ping(payload: String) -> String {
    println!("Received ping from frontend: {}", payload);
    format!("Pong! You sent: '{}'. Server time: {:?}. IPC is healthy!", payload, std::time::SystemTime::now())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![test_ipc_ping])
    .setup(|app| {
      // Start the Sidecar Player Server
      player_server::start();

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
