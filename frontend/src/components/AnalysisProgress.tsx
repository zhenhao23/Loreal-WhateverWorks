import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Typography, Progress, Steps } from "antd";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const { Title, Text } = Typography;

export interface AnalysisStep {
  title: string;
  description: string;
  icon: string;
}

export type AnalysisStage = "cleaning" | "spam-detection" | "analysis" | "done";

interface AnalysisProgressProps {
  analysisStage: AnalysisStage;
  analysisProgress: number;
  currentStepIndex: number;
  analysisSteps: AnalysisStep[];
  onCancel: () => void;
  onComplete: () => void;
}

const AnalysisProgress = ({
  analysisStage,
  analysisProgress,
  currentStepIndex,
  analysisSteps,
  onCancel,
  onComplete,
}: AnalysisProgressProps) => {
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
            width: 300,
            height: 300,
            margin: "0 auto",
            // marginBottom: 24,
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
          Currently {analysisSteps[currentStepIndex]?.description.toLowerCase()}
          ...
        </Text>

        {analysisStage === "done" ? (
          <Button
            type="primary"
            size="large"
            icon={<CheckCircleOutlined />}
            onClick={onComplete}
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
            onClick={onCancel}
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
};

export default AnalysisProgress;
