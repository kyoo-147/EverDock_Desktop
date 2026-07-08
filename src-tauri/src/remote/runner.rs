pub struct RemoteRunner;

impl RemoteRunner {
    pub fn new() -> Self {
        RemoteRunner
    }

    pub fn start_runner(&self) -> Result<(), String> {
        Ok(())
    }

    pub fn get_status(&self) -> String {
        "active".to_string()
    }
}
