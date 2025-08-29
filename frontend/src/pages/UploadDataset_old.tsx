import {
  InboxOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Upload,
  Typography,
  Space,
  Progress,
  Steps,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface UploadedFile {
  id: number;
  originalName: string;
  filename: string;
  size: number;
  uploadDate: string;
}

type AnalysisStage = "cleaning" | "spam-detection" | "analysis" | "done";

const UploadDataset = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<AnalysisStage>("cleaning");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Analysis steps configuration
  const analysisSteps = [
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

  // Fetch uploaded files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/files");
      const data = await response.json();
      setUploadedFiles(data.files || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/files/${fileId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("File deleted successfully");
        fetchFiles(); // Refresh file list
      } else {
        message.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete file");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Start Analysis Function
  const startAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      message.error("Please upload at least one file before starting analysis");
      return;
    }

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
              setAnalyzing(false);
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

  // Cancel Analysis
  const cancelAnalysis = () => {
    setAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
    message.info("Analysis cancelled");
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "http://localhost:5000/api/upload",
    onChange(info: any) {
      const { status } = info.file;

      if (status === "uploading") {
        setUploading(true);
      } else if (status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
        setUploading(false);
        fetchFiles(); // Refresh file list
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed`);
        setUploading(false);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false, // We'll show our custom list
  };

  // Analysis Screen
  if (analyzing) {
    return (
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        {/* Top Section */}
        <div style={{ marginBottom: 40 }}>
          <Title level={2} style={{ color: "#5A67BA", marginBottom: 8 }}>
            🧠 Processing your data...
          </Title>
          <Text style={{ color: "rgba(166, 171, 200, 1)", fontSize: 18 }}>
            Sit tight, this might take a minute!
          </Text>
        </div>

        {/* Center Section - Animation and Progress */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              width: 200,
              height: 200,
              margin: "0 auto",
              marginBottom: 24,
            }}
          >
            <DotLottieReact
              src="https://lottie.host/95fda9c0-1e36-4968-b883-d6f02e168c41/byxBmB74NZ.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <Progress
            percent={analysisProgress}
            strokeColor="#5A67BA"
            style={{ marginBottom: 32 }}
          />

          <Steps
            current={currentStepIndex}
            direction="vertical"
            style={{ maxWidth: 400, margin: "0 auto" }}
            items={analysisSteps.map((step, index) => ({
              title: (
                <span
                  style={{
                    color:
                      index <= currentStepIndex
                        ? "#5A67BA"
                        : "rgba(166, 171, 200, 0.6)",
                  }}
                >
                  {step.icon} {step.title}
                </span>
              ),
              description: (
                <span
                  style={{
                    color:
                      index <= currentStepIndex
                        ? "#5A67BA"
                        : "rgba(166, 171, 200, 0.6)",
                  }}
                >
                  {step.description}
                </span>
              ),
              status:
                index < currentStepIndex
                  ? "finish"
                  : index === currentStepIndex
                  ? "process"
                  : "wait",
            }))}
          />
        </div>

        {/* Bottom Section */}
        <div>
          <Text
            style={{
              color: "rgba(166, 171, 200, 1)",
              fontSize: 16,
              display: "block",
              marginBottom: 20,
            }}
          >
            Currently{" "}
            {analysisSteps[currentStepIndex]?.description.toLowerCase()}...
          </Text>

          {analysisStage === "done" ? (
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={() => {
                // Navigate to dashboard or close analysis view
                setAnalyzing(false);
              }}
              style={{
                backgroundColor: "#5A67BA",
                borderColor: "#5A67BA",
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
                padding: "0 32px",
              }}
            >
              Go to Dashboard 🎉
            </Button>
          ) : (
            <Button
              type="default"
              size="large"
              onClick={cancelAnalysis}
              style={{
                height: 48,
                fontSize: 16,
                borderRadius: 8,
                padding: "0 32px",
              }}
            >
              Cancel Analysis
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ color: "#5A67BA", marginBottom: 8 }}>
          Upload Dataset
        </Title>
        <Text style={{ color: "rgba(166, 171, 200, 1)", fontSize: 16 }}>
          Upload your dataset files to get started with analysis
        </Text>
      </div>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Upload Button */}
        <div>
          <Upload {...uploadProps} showUploadList={false}>
            <Button
              icon={<UploadOutlined />}
              size="large"
              loading={uploading}
              style={{
                backgroundColor: "#5A67BA",
                borderColor: "#5A67BA",
                color: "white",
                height: 48,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
                padding: "0 32px",
              }}
              onMouseEnter={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor = "#4A57A8";
                  e.currentTarget.style.borderColor = "#4A57A8";
                }
              }}
              onMouseLeave={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor = "#5A67BA";
                  e.currentTarget.style.borderColor = "#5A67BA";
                }
              }}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
          </Upload>
        </div>

        {/* Drop Zone */}
        <Dragger
          {...uploadProps}
          style={{
            backgroundColor: "#F1F2F7",
            border: "2px dashed rgba(166, 171, 200, 0.6)",
            borderRadius: 12,
            padding: "48px 24px",
          }}
        >
          <p className="ant-upload-drag-icon" style={{ marginBottom: 16 }}>
            <InboxOutlined
              style={{
                fontSize: 48,
                color: "rgba(166, 171, 200, 0.8)",
              }}
            />
          </p>
          <p
            className="ant-upload-text"
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#5A67BA",
              marginBottom: 8,
            }}
          >
            Drop your files here
          </p>
          <p
            className="ant-upload-hint"
            style={{
              fontSize: 14,
              color: "rgba(166, 171, 200, 1)",
              margin: 0,
            }}
          >
            Support for CSV, Excel, JSON files. You can upload multiple files at
            once.
          </p>
        </Dragger>

        {/* Start Analysis Button */}
        {uploadedFiles.length > 0 && (
          <div style={{ textAlign: "center", margin: "32px 0" }}>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={startAnalysis}
              style={{
                backgroundColor: "#5A67BA",
                borderColor: "#5A67BA",
                height: 56,
                fontSize: 18,
                fontWeight: 600,
                borderRadius: 8,
                padding: "0 48px",
                boxShadow: "0 4px 12px rgba(90, 103, 186, 0.3)",
              }}
            >
              🚀 Start Analysis
            </Button>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div>
            <Title level={4} style={{ color: "#5A67BA", marginBottom: 16 }}>
              Uploaded Files ({uploadedFiles.length})
            </Title>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  style={{
                    backgroundColor: "#F8F9FB",
                    border: "1px solid #E8EAED",
                    borderRadius: 8,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text strong style={{ color: "#5A67BA", fontSize: 14 }}>
                      {file.originalName}
                    </Text>
                    <br />
                    <Text
                      style={{ color: "rgba(166, 171, 200, 1)", fontSize: 12 }}
                    >
                      {formatFileSize(file.size)} •{" "}
                      {new Date(file.uploadDate).toLocaleString()}
                    </Text>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(file.id)}
                    style={{
                      color: "#ff4d4f",
                      borderRadius: 6,
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Requirements */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            padding: 20,
            borderRadius: 8,
            border: "1px solid #E8EAED",
          }}
        >
          <Text
            strong
            style={{ color: "#5A67BA", fontSize: 14, marginBottom: 8 }}
          >
            File Requirements:
          </Text>
          <ul
            style={{
              margin: "8px 0 0 0",
              paddingLeft: 20,
              color: "rgba(166, 171, 200, 1)",
            }}
          >
            <li>Maximum file size: 10MB</li>
            <li>Supported formats: .csv, .xlsx, .json</li>
            <li>Files should contain structured data with headers</li>
          </ul>
        </div>
      </Space>
    </div>
  );
};

export default UploadDataset;
