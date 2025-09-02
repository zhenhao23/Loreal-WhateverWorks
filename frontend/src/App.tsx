import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import UploadDataset from "./pages/UploadDataset";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route path="/upload" element={<UploadDataset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/upload" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
