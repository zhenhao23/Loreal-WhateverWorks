import { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  RobotOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DifyWorkflow from "./pages/DifyWorkflow";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import UploadDataset from "./pages/UploadDataset";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <UploadDataset />;
      case "2":
        return <DifyWorkflow />;
      case "3":
        return <Dashboard />;
      case "4":
        return <Chatbot />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header spanning full width */}
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "26px",
            backgroundColor: "#5A67BA",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          W
        </div>
        <Title
          level={5}
          style={{ margin: 0, color: "#5A67BA", fontWeight: 650 }}
        >
          WhateverWorks
        </Title>
      </Header>

      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar */}
        <Sider
          style={{
            background: "#F1F2F7",
            minHeight: "calc(100vh - 64px)",
          }}
          theme="light"
        >
          <div
            style={{
              padding: "16px 16px 8px 16px",
              color: "rgba(166, 171, 200, 1)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            MENU
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{
              background: "#F1F2F7",
              border: "none",
            }}
            items={[
              {
                key: "1",
                icon: <PlusOutlined />,
                label: "Upload Dataset",
                style: {
                  color:
                    selectedKey === "1" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "1"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "1" ? 600 : 400,
                },
              },
              {
                key: "2",
                icon: <AppstoreOutlined />,
                label: "Dify Workflow",
                style: {
                  color:
                    selectedKey === "2" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "2"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "2" ? 600 : 400,
                },
              },
              {
                key: "3",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                style: {
                  color:
                    selectedKey === "3" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "3"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "3" ? 600 : 400,
                },
              },
              {
                key: "4",
                icon: <RobotOutlined />,
                label: "Chatbot",
                style: {
                  color:
                    selectedKey === "4" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "4"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "4" ? 600 : 400,
                },
              },
            ]}
          />
        </Sider>

        {/* Page content */}
        <Content
          style={{
            padding: 32,
            background: "#fff",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
