use sysinfo::System;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_apps() -> Vec<String> {
    let mut system = System::new_all();
    system.refresh_all();

    system.processes()
        .values()
        .map(|a| a.name().to_string())
        .collect()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
