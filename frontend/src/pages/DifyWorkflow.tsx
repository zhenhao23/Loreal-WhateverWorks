import { Typography } from "antd";

const { Title } = Typography;

function DifyWorkflow() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16, padding: "0 8px" }}>
        <Title level={3} style={{ color: "#5A67BA", marginBottom: 8 }}>
          Dify Workflow
        </Title>
      </div>

      <div style={{ flex: 1, minHeight: "calc(100vh - 200px)" }}>
        <iframe
          src="https://cloud.dify.ai/app"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          title="Dify Application"
          allow="microphone; camera; clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
        />
      </div>
    </div>
  );
}

export default DifyWorkflow;
