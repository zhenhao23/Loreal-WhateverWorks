import { message } from "antd";
import FileUploadSection from "../components/FileUploadSection";
import AnalysisProgress from "../components/AnalysisProgress";
import useAnalysis from "../hooks/useAnalysis";

const UploadDataset = () => {
  const {
    analyzing,
    analysisStage,
    analysisProgress,
    currentStepIndex,
    analysisSteps,
    startAnalysis,
    cancelAnalysis,
    completeAnalysis,
  } = useAnalysis();

  const handleStartAnalysis = async () => {
    // Check if files are uploaded
    try {
      const response = await fetch("http://localhost:5000/api/files");
      const data = await response.json();
      const uploadedFiles = data.files || [];
      
      if (uploadedFiles.length === 0) {
        message.error("Please upload at least one file before starting analysis");
        return;
      }
      
      await startAnalysis();
    } catch (error) {
      console.error("Failed to check uploaded files:", error);
      message.error("Failed to check uploaded files");
    }
  };

  // Show analysis screen if analyzing
  if (analyzing) {
    return (
      <AnalysisProgress
        analysisStage={analysisStage}
        analysisProgress={analysisProgress}
        currentStepIndex={currentStepIndex}
        analysisSteps={analysisSteps}
        onCancel={cancelAnalysis}
        onComplete={completeAnalysis}
      />
    );
  }

  // Show upload screen
  return <FileUploadSection onStartAnalysis={handleStartAnalysis} />;
};

export default UploadDataset;
