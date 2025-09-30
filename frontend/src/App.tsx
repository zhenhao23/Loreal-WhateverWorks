import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ApiFetch from "./pages/ApiFetch";
import Dashboard from "./pages/Dashboard";
import UploadDataset from "./pages/UploadDataset";
import ProductTeam from "./pages/ProductTeam";
import InternalMarketing from "./pages/InternalMarketing";
import ExternalMarketing from "./pages/ExternalMarketing";
// import SuperChatbot from "./pages/SuperChatbot";
import AiAutoReplyBot from "./pages/AiAutoReplyBot";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route path="/api-fetch" element={<ApiFetch />} />
          <Route path="/upload" element={<UploadDataset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-team" element={<ProductTeam />} />
          <Route path="/internal-marketing" element={<InternalMarketing />} />
          <Route path="/external-marketing" element={<ExternalMarketing />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/ai-auto-reply" element={<AiAutoReplyBot />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/upload" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
