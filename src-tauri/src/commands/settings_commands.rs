use tauri::command;
use tauri::Manager;
use sqlx::sqlite::SqlitePoolOptions;

const SETTINGS_KEY_DISCOGS_TOKEN: &str = "discogs_token";

async fn get_db_path(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    let app_data_dir = app.path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    Ok(app_data_dir.join("discogs.db"))
}

#[command]
pub async fn get_discogs_token(app: tauri::AppHandle) -> Result<Option<String>, String> {
    let db_path = get_db_path(&app).await?;
    
    let pool = SqlitePoolOptions::new()
        .connect_with(
            sqlx::sqlite::SqliteConnectOptions::new()
                .filename(&db_path)
                .create_if_missing(true),
        )
        .await
        .map_err(|e| format!("Failed to connect to database: {}", e))?;
    
    let result = sqlx::query_as::<_, (String,)>(
        "SELECT value FROM settings WHERE key = ?"
    )
    .bind(SETTINGS_KEY_DISCOGS_TOKEN)
    .fetch_optional(&pool)
    .await
    .map_err(|e| format!("Database error: {}", e))?;

    Ok(result.map(|(token,)| token))
}

#[command]
pub async fn set_discogs_token(app: tauri::AppHandle, token: String) -> Result<(), String> {
    let db_path = get_db_path(&app).await?;
    
    let pool = SqlitePoolOptions::new()
        .connect_with(
            sqlx::sqlite::SqliteConnectOptions::new()
                .filename(&db_path)
                .create_if_missing(true),
        )
        .await
        .map_err(|e| format!("Failed to connect to database: {}", e))?;
    
    sqlx::query(
        "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)"
    )
    .bind(SETTINGS_KEY_DISCOGS_TOKEN)
    .bind(&token)
    .execute(&pool)
    .await
    .map_err(|e| format!("Database error: {}", e))?;

    Ok(())
}
