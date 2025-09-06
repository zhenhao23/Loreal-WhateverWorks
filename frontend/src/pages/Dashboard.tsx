import { useState } from "react";
import { Row, Col, Select, DatePicker, Tabs, Card } from "antd";
import {
  CalendarOutlined,
  FilterOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ExecutiveOverview from "../components/ExecutiveOverview";
import ContentQualityKPI from "../components/ContentQualityKPI";
import VideoBreakdown from "../components/VideoBreakdown";
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
  const [selectedLanguage, setSelectedLanguage] = useState("all");

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
          <FilterOutlined />
          Content Quality & KPI
        </span>
      ),
      children: (
        <ContentQualityKPI
          dateFilter={selectedYearRange}
          categoryFilter={selectedCategory}
          languageFilter={selectedLanguage}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <VideoCameraOutlined />
          Video Breakdown
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
            <Row gutter={[16, 8]} align="middle">
              <Col xs={24} sm={8} md={6}>
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
              <Col xs={24} sm={8} md={6}>
                <div
                  style={{
                    marginBottom: "4px",
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  CATEGORY
                </div>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  style={{ width: "100%" }}
                  placeholder="Select category"
                >
                  <Option value="all">All Categories</Option>
                  <Option value="skincare">Skincare</Option>
                  <Option value="makeup">Makeup</Option>
                  <Option value="haircare">Hair Care</Option>
                  <Option value="fragrance">Fragrance</Option>
                  <Option value="men">Men's</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8} md={6}>
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
                  <Option value="all">All Languages</Option>
                  <Option value="en">English</Option>
                  <Option value="fr">French</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="de">German</Option>
                  <Option value="it">Italian</Option>
                  <Option value="pt">Portuguese</Option>
                  <Option value="zh">Chinese</Option>
                  <Option value="ja">Japanese</Option>
                </Select>
              </Col>
            </Row>
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
