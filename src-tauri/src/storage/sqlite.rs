pub struct SqliteDatabase;

impl SqliteDatabase {
    pub fn new() -> Self {
        SqliteDatabase
    }

    pub fn initialize(&self, _db_path: &str) -> Result<(), String> {
        Ok(())
    }

    pub fn execute_query(&self, _query: &str) -> Result<(), String> {
        Ok(())
    }
}
