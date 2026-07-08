use crate::domain::storage::StorageRepository;

pub struct SqliteDatabase;

impl SqliteDatabase {
    pub fn new() -> Self {
        SqliteDatabase
    }
}

impl StorageRepository for SqliteDatabase {
    fn initialize(&self, _db_path: &str) -> Result<(), String> {
        Ok(())
    }

    fn execute_query(&self, _query: &str) -> Result<(), String> {
        Ok(())
    }
}
