import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import type {
  AnalysisStage,
  AnalysisStep,
} from "../components/AnalysisProgress";

export const useAnalysis = () => {
  const navigate = useNavigate();
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
      // Simulate Data Cleaning stage
      setCurrentStepIndex(0);
      setAnalysisStage("cleaning");
      setAnalysisProgress(25);
      console.log("Starting data cleaning...");

      // Wait 3 seconds for cleaning stage
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate Spam Detection stage
      setCurrentStepIndex(1);
      setAnalysisStage("spam-detection");
      setAnalysisProgress(50);
      console.log("Starting spam detection...");

      // Wait 4 seconds for spam detection stage
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate Data Analysis stage
      setCurrentStepIndex(2);
      setAnalysisStage("analysis");
      setAnalysisProgress(75);
      console.log("Starting data analysis...");

      // Wait 5 seconds for analysis stage
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Complete the analysis
      setCurrentStepIndex(3);
      setAnalysisStage("done");
      setAnalysisProgress(100);
      console.log("Analysis completed successfully!");

      setTimeout(() => {
        message.success("Analysis completed successfully! 🎉");
      }, 1000);
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
    // Navigate to dashboard when analysis is complete
    navigate("/dashboard");
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
