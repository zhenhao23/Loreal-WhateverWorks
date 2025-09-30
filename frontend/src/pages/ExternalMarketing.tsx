import { useState } from "react";
import { Row, Col, Select, DatePicker, Tabs, Card, Input } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import InfluencerIntelligence from "../components/InfluencerIntelligence";
import type { TabsProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

type YearRange = [Dayjs | null, Dayjs | null] | null;

const ExternalMarketing = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedYearRange, setSelectedYearRange] = useState<YearRange>([
    dayjs("2020"),
    dayjs("2025"),
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [keywords, setKeywords] = useState("");

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserOutlined />
          KOL Recommendations
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
            {/* First Row: Date Range, Sentiment, Platform */}
            <Row
              gutter={[16, 8]}
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col xs={24} sm={8} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  DATE RANGE
                </div>
                <RangePicker
                  style={{ width: "100%" }}
                  placeholder={["Start Date", "End Date"]}
                  value={selectedYearRange}
                  suffixIcon={<CalendarOutlined style={{ color: "#A6ABC8" }} />}
                  onChange={(dates) => setSelectedYearRange(dates)}
                />
              </Col>
              {/* <Col xs={24} sm={8} md={8}>
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
              </Col> */}
              <Col xs={24} sm={8} md={8}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  PLATFORM
                </div>
                <Select
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  style={{ width: "100%" }}
                  placeholder="Select platform"
                >
                  <Option value="youtube">YouTube</Option>
                  <Option value="tiktok">TikTok</Option>
                  <Option value="instagram">Instagram</Option>
                  <Option value="all">All Platforms</Option>
                </Select>
              </Col>
            </Row>

            {/* Second Row: Keywords */}
            {/* <Row gutter={[8, 8]} align="middle">
              <Col span={24}>
                <div
                  style={{
                    marginBottom: "8px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  KEYWORDS
                </div>
                <Input
                  placeholder="Enter keywords (e.g., skincare, moisturizer, anti-aging)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  style={{
                    width: "30%",
                    borderRadius: "6px",
                    height: "40px",
                  }}
                />
              </Col>
            </Row> */}
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
          margin: "0 0 0px 0",
          padding: "0 24px",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
};

export default ExternalMarketing;
