pub trait StorageRepository: Send + Sync {
    fn initialize(&self, db_path: &str) -> Result<(), String>;
    fn execute_query(&self, query: &str) -> Result<(), String>;
}
