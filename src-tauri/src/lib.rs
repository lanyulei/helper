use tauri_plugin_sql::{Migration, MigrationKind};

// mod tray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "-- 创建表 helper_tools_password
CREATE TABLE helper_tools_password (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    title TEXT NOT NULL,
    password TEXT NOT NULL,
    url TEXT NOT NULL,
    remarks TEXT,
    create_time DATETIME DEFAULT (datetime('now', 'localtime')),
    update_time DATETIME DEFAULT (datetime('now', 'localtime'))
);

-- 创建触发器 update_update_time_on_insert
CREATE TRIGGER update_update_time_on_insert
AFTER INSERT ON helper_tools_password
BEGIN
    UPDATE helper_tools_password SET update_time = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- 创建触发器 update_update_time_on_update
CREATE TRIGGER update_update_time_on_update
AFTER UPDATE ON helper_tools_password
BEGIN
    UPDATE helper_tools_password SET update_time = datetime('now', 'localtime') WHERE id = NEW.id;
END;",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        // .setup(|app| {
        //     #[cfg(all(desktop))]
        //     {
        //         let handle = app.handle();
        //         tray::create_tray(handle)?;
        //     }
        //     Ok(())
        // })
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:sqlite.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
