import { useState } from "react";
import { Button, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function Chatbot() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: 0, margin: 0 }}>
      {/* Header Section */}
      <div
        style={{
          background: "#fafbfc",
          borderBottom: "1px solid #f0f2f7",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 600,
            color: "#5A6ACF",
          }}
        >
          WhateverWorks - Data Pipeline Explorer
        </h1>
        <Button
          type="primary"
          icon={<QuestionCircleOutlined />}
          onClick={showModal}
          style={{
            backgroundColor: "#5A6ACF",
            borderColor: "#5A6ACF",
            height: "40px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          What can I ask?
        </Button>
      </div>

      {/* Iframe Container */}
      <div style={{ height: "calc(100vh - 73px)" }}>
        <iframe
          src="https://udify.app/chatbot/b8Vo6VJcOoC0fNzX"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "600px",
            border: "none",
          }}
          allow="microphone"
          title="L'Oreal Chatbot"
        />
      </div>

      {/* Modal */}
      <Modal
        title={
          <span style={{ color: "#5A6ACF", fontSize: "18px", fontWeight: 600 }}>
            WhateverWorks - Data Pipeline Explorer
          </span>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#5A6ACF", borderColor: "#5A6ACF" }}
          >
            Got it!
          </Button>,
        ]}
      >
        <div style={{ lineHeight: "1.6", color: "#333" }}>
          <p style={{ marginBottom: "16px", fontSize: "16px", color: "#666" }}>
            Curious about how your data was processed? WhateverWorks explains
            the complete data pipeline behind this application - from raw data
            cleaning and preprocessing steps, through the analysis methods used,
            to how the final visualizations were created. Ask questions about
            any part of the data methodology to understand the technical
            decisions and processes that power your results.
          </p>

          <div style={{ marginTop: "20px" }}>
            <h4
              style={{
                color: "#5A6ACF",
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              Example questions you can ask:
            </h4>
            <ul
              style={{ paddingLeft: "20px", color: "#666", fontSize: "15px" }}
            >
              <li style={{ marginBottom: "10px" }}>
                How did you clean the raw data before analysis?
              </li>
              <li style={{ marginBottom: "10px" }}>
                What analysis methods did you use and why?
              </li>
              <li style={{ marginBottom: "10px" }}>
                What spam detection methods did you use?
              </li>
              <li style={{ marginBottom: "10px" }}>
                How did you calculate KPI and Engagement Score?
              </li>
              <li style={{ marginBottom: "10px" }}>
                What Machine learning models were used?
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Chatbot;
