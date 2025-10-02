import { useState, useEffect } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApiOutlined,
  TeamOutlined,
  BulbOutlined,
  GlobalOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");
  const [collapsed, setCollapsed] = useState(false);

  // Map routes to menu keys
  const routeToKeyMap: { [key: string]: string } = {
    "/": "2",
    "/api-fetch": "1",
    "/upload": "2",
    "/dashboard": "3",
    "/product-team": "4",
    "/internal-marketing": "5",
    "/external-marketing": "6",
    "/chatbot": "7",
    "/ai-auto-reply": "8",
  };

  // Map menu keys to routes
  const keyToRouteMap: { [key: string]: string } = {
    "1": "/api-fetch",
    "2": "/upload",
    "3": "/dashboard",
    "4": "/product-team",
    "5": "/internal-marketing",
    "6": "/external-marketing",
    "7": "/chatbot",
    "8": "/ai-auto-reply",
  };

  // Update selected key based on current route
  useEffect(() => {
    const currentKey = routeToKeyMap[location.pathname] || "2";
    setSelectedKey(currentKey);
  }, [location.pathname]);

  const handleMenuClick = (e: { key: string }) => {
    const route = keyToRouteMap[e.key];
    if (route) {
      navigate(route);
      setSelectedKey(e.key);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: "16px",
            width: 40,
            height: 40,
            marginRight: "8px",
          }}
        />
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
          collapsible
          collapsed={collapsed}
          trigger={null}
          style={{
            background: "#F1F2F7",
            minHeight: "calc(100vh - 64px)",
          }}
          theme="light"
        >
          {!collapsed && (
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
          )}
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{
              background: "#F1F2F7",
              border: "none",
            }}
            items={[
              {
                key: "1",
                icon: <ApiOutlined />,
                label: "API Fetch",
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
                icon: <PlusOutlined />,
                label: "Upload Dataset",
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
              // {
              //   key: "3",
              //   icon: <DashboardOutlined />,
              //   label: "Dashboard",
              //   style: {
              //     color:
              //       selectedKey === "3" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
              //     backgroundColor:
              //       selectedKey === "3"
              //         ? "rgba(112, 127, 221, 0.1)"
              //         : "transparent",
              //     margin: "4px 8px",
              //     borderRadius: "6px",
              //     fontWeight: selectedKey === "3" ? 600 : 400,
              //   },
              // },
              {
                key: "4",
                icon: <TeamOutlined />,
                label: "Product Team",
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
              {
                key: "5",
                icon: <BulbOutlined />,
                label: "Internal Marketing",
                style: {
                  color:
                    selectedKey === "5" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "5"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "5" ? 600 : 400,
                },
              },
              {
                key: "6",
                icon: <GlobalOutlined />,
                label: "External Marketing",
                style: {
                  color:
                    selectedKey === "6" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "6"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "6" ? 600 : 400,
                },
              },
              {
                key: "7",
                icon: <MessageOutlined />,
                label: "Super Chatbot",
                style: {
                  color:
                    selectedKey === "7" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "7"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "7" ? 600 : 400,
                },
              },
              {
                key: "8",
                icon: <SendOutlined />,
                label: "Smart Replies",
                style: {
                  color:
                    selectedKey === "8" ? "#5A6ACF" : "rgba(166, 171, 200, 1)",
                  backgroundColor:
                    selectedKey === "8"
                      ? "rgba(112, 127, 221, 0.1)"
                      : "transparent",
                  margin: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: selectedKey === "8" ? 600 : 400,
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
