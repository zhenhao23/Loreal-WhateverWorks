import { useState } from "react";
import { message } from "antd";
import type {
  AnalysisStage,
  AnalysisStep,
} from "../components/AnalysisProgress";

export const useAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<AnalysisStage>("cleaning");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const analysisSteps: AnalysisStep[] = [
    {
      title: "Data Cleaning",
      description: "Cleaning and preparing your dataset",
      icon: "🧹",
    },
    {
      title: "Spam Detection",
      description: "Detecting and filtering spam content",
      icon: "🚫",
    },
    {
      title: "Data Analysis",
      description: "Running advanced data analysis",
      icon: "📈",
    },
    {
      title: "Complete",
      description: "Analysis completed successfully",
      icon: "✅",
    },
  ];

  const startAnalysis = async () => {
    setAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
    setAnalysisStage("cleaning");

    try {
      // Start the analysis by calling the backend script
      const response = await fetch("http://localhost:5000/api/run-script");
      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("Failed to start analysis");
      }

      // Process the streaming response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk
          .split("\n")
          .filter((line) => line.startsWith("data:"));

        for (const line of lines) {
          const data = line.replace("data: ", "").trim();
          console.log("Analysis progress:", data);

          // Update progress based on script output
          if (data.includes("Data cleaning started")) {
            setCurrentStepIndex(0);
            setAnalysisStage("cleaning");
            setAnalysisProgress(25);
          } else if (data.includes("Spam detection started")) {
            setCurrentStepIndex(1);
            setAnalysisStage("spam-detection");
            setAnalysisProgress(50);
          } else if (data.includes("Analysis started")) {
            setCurrentStepIndex(2);
            setAnalysisStage("analysis");
            setAnalysisProgress(75);
          } else if (
            data.includes("DONE:") ||
            data.includes("SCRIPT FINISHED")
          ) {
            setCurrentStepIndex(3);
            setAnalysisStage("done");
            setAnalysisProgress(100);

            setTimeout(() => {
              message.success("Analysis completed successfully! 🎉");
            }, 1000);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Analysis error:", error);
      message.error("Analysis failed. Please try again.");
      setAnalyzing(false);
    }
  };

  const cancelAnalysis = () => {
    setAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
    message.info("Analysis cancelled");
  };

  const completeAnalysis = () => {
    setAnalyzing(false);
    // Here you could navigate to dashboard or do other completion tasks
  };

  return {
    analyzing,
    analysisStage,
    analysisProgress,
    currentStepIndex,
    analysisSteps,
    startAnalysis,
    cancelAnalysis,
    completeAnalysis,
  };
};

export default useAnalysis;
