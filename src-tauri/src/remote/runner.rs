use crate::domain::remote::RemoteRunner as RemoteRunnerTrait;

pub struct RemoteRunner;

impl RemoteRunner {
    pub fn new() -> Self {
        RemoteRunner
    }
}

impl RemoteRunnerTrait for RemoteRunner {
    fn start_runner(&self) -> Result<(), String> {
        Ok(())
    }

    fn get_status(&self) -> String {
        "active".to_string()
    }
}
