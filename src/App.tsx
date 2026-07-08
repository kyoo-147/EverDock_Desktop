import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import TerminalWorkspace from "./pages/TerminalWorkspace";
import Sessions from "./pages/Sessions";
import Tasks from "./pages/Tasks";
import Agents from "./pages/Agents";
import Workspaces from "./pages/Workspaces";
import ScreenFleet from "./pages/ScreenFleet";
import MissionControl from "./pages/MissionControl";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<TerminalWorkspace />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/screen-fleet" element={<ScreenFleet />} />
          <Route path="/mission-control" element={<MissionControl />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
