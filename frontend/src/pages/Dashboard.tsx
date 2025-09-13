import { useState } from "react";
import { Row, Col, Select, DatePicker, Tabs, Card, Button } from "antd";
import {
  CalendarOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ExecutiveOverview from "../components/ExecutiveOverview";
import ContentQualityKPI from "../components/ContentQualityKPI";
import VideoBreakdown from "../components/VideoBreakdown";
import InfluencerIntelligence from "../components/InfluencerIntelligence";
import type { TabsProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

type YearRange = [Dayjs | null, Dayjs | null] | null;

function Dashboard() {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedYearRange, setSelectedYearRange] = useState<YearRange>([
    dayjs("2020"),
    dayjs("2025"),
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const categories = [
    { key: "all", label: "All" },
    { key: "skin", label: "Skin" },
    { key: "body", label: "Body" },
    { key: "hair", label: "Hair" },
    { key: "perfume", label: "Perfume" },
    { key: "makeup", label: "Makeup" },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BarChartOutlined />
          Executive Overview
        </span>
      ),
      children: (
        <ExecutiveOverview
          dateFilter={selectedYearRange}
          categoryFilter={selectedCategory}
          languageFilter={selectedLanguage}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ExclamationCircleOutlined />
          Pain Points & Opportunities
        </span>
      ),
      children: (
        <ContentQualityKPI
          dateFilter={selectedYearRange}
          categoryFilter={selectedCategory}
          languageFilter={selectedLanguage}
          sentimentFilter={selectedSentiment}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <VideoCameraOutlined />
          Video Engagement
        </span>
      ),
      children: (
        <VideoBreakdown
          dateFilter={selectedYearRange}
          categoryFilter={selectedCategory}
          languageFilter={selectedLanguage}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserOutlined />
          Channel & Content Intelligence
        </span>
      ),
      children: (
        <InfluencerIntelligence
          dateFilter={selectedYearRange}
          languageFilter={selectedLanguage}
        />
      ),
    },
  ];

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: "0" }}>
      {/* Top Bar Filters */}
      <Card
        style={{
          marginBottom: "0px",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        bodyStyle={{ padding: "20px 24px" }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col flex={1}>
            {/* First Row: Year Range and Language */}
            <Row
              gutter={[16, 8]}
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col xs={24} sm={12} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  YEAR RANGE
                </div>
                <RangePicker
                  picker="year"
                  style={{ width: "100%" }}
                  placeholder={["Start Year", "End Year"]}
                  value={selectedYearRange}
                  suffixIcon={<CalendarOutlined style={{ color: "#A6ABC8" }} />}
                  onChange={(dates) => setSelectedYearRange(dates)}
                  disabledDate={(current) => {
                    const year = current.year();
                    return year < 2020 || year > 2025;
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  LANGUAGE
                </div>
                <Select
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  style={{ width: "100%" }}
                  placeholder="Select language"
                >
                  <Option value="english">English</Option>
                  <Option value="non-english" disabled>
                    Non-English
                  </Option>
                </Select>
              </Col>
              {activeTab === "2" && (
                <Col xs={24} sm={12} md={8}>
                  <div
                    style={{
                      marginBottom: "4px",
                      color: "#666",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    SENTIMENT
                  </div>
                  <Select
                    value={selectedSentiment}
                    onChange={setSelectedSentiment}
                    style={{ width: "100%" }}
                    placeholder="Select sentiment"
                  >
                    <Option value="negative">Negative</Option>
                    <Option value="neutral">Neutral</Option>
                    <Option value="positive">Positive</Option>
                    <Option value="all">All</Option>
                  </Select>
                </Col>
              )}
            </Row>

            {/* Second Row: Category Buttons */}
            {activeTab !== "4" && (
              <Row gutter={[8, 8]} align="middle">
                <Col span={24}>
                  <div
                    style={{
                      marginBottom: "8px",
                      color: "#666",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    CATEGORY
                  </div>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {categories.map((category) => (
                      <Button
                        key={category.key}
                        type={
                          selectedCategory === category.key
                            ? "primary"
                            : "default"
                        }
                        onClick={() => setSelectedCategory(category.key)}
                        style={{
                          borderRadius: "6px",
                          fontWeight: 500,
                          fontSize: "13px",
                          height: "32px",
                          paddingLeft: "16px",
                          paddingRight: "16px",
                          border:
                            selectedCategory === category.key
                              ? "none"
                              : "1px solid #d9d9d9",
                          backgroundColor:
                            selectedCategory === category.key
                              ? "#5A6ACF"
                              : "#fff",
                          color:
                            selectedCategory === category.key ? "#fff" : "#666",
                        }}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          background: "transparent",
        }}
        tabBarStyle={{
          background: "#fff",
          margin: "0 0 24px 0",
          padding: "0 24px",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
}

export default Dashboard;
