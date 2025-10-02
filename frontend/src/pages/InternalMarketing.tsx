import { useState, useEffect } from "react";
import { Row, Col, Select, DatePicker, Tabs, Card, Input, Spin } from "antd";
import {
  CalendarOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  UserOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Table, Tag, Space } from "antd";
import {
  BulbOutlined,
  ClockCircleOutlined,
  TagOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { mockBestVideoTopicData } from "../components/BestVideoTopicMockData";
import { Bar, Line } from "@ant-design/plots";
import {
  mockVideoCategoryData,
  mockCategoryLeaderboardData,
  mockVideoMetrics,
  mockEngagementTimelineData,
  type VideoBreakdownData,
} from "../components/VideoBreakdownMockData";
import { Button } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

type YearRange = [Dayjs | null, Dayjs | null] | null;

const InternalMarketing = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedYearRange, setSelectedYearRange] = useState<YearRange>([
    dayjs("2020"),
    dayjs("2025"),
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [keywords, setKeywords] = useState("");
  const [engagementTimelineData, setEngagementTimelineData] = useState(
    mockEngagementTimelineData
  );
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: "All" },
    { key: "skin", label: "L'Oréal" },
    { key: "body", label: "Estée Lauder" },
    { key: "hair", label: "Shiseido" },
    { key: "perfume", label: "Unilever" },
    { key: "makeup", label: "Beiersdorf" },
    { key: "other", label: "Other" },
  ];

  // Function to fetch data from API
  const fetchVideoBreakdownData = async (
    page = 1,
    pageSize = 10
  ): Promise<VideoBreakdownData> => {
    try {
      // Convert dateFilter to year-only format
      let processedDateFilter = null;
      if (
        selectedYearRange &&
        Array.isArray(selectedYearRange) &&
        selectedYearRange.length === 2
      ) {
        processedDateFilter = [
          selectedYearRange[0]?.year?.() ||
            selectedYearRange[0]?.format?.("YYYY") ||
            "2020",
          selectedYearRange[1]?.year?.() ||
            selectedYearRange[1]?.format?.("YYYY") ||
            "2025",
        ];
      } else {
        processedDateFilter = ["2020", "2025"];
      }

      // Replace this with your actual API endpoint
      const response = await fetch(
        "http://localhost:5000/api/video-breakdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateFilter: processedDateFilter,
            sentimentFilter: selectedSentiment,
            platformFilter: selectedLanguage,
            keywords: keywords,
            current: page,
            pageSize: pageSize,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const apiData = await response.json();

      // Transform API data to match expected format if needed
      return {
        videoCategoryData: apiData.videoCategoryData || mockVideoCategoryData,
        categoryLeaderboardData: apiData.categoryLeaderboardData || {
          data: mockCategoryLeaderboardData,
          total: mockCategoryLeaderboardData.length,
          pageSize: pageSize,
          current: page,
        },
        videoMetrics: apiData.videoMetrics || mockVideoMetrics,
        engagementTimelineData:
          apiData.engagementTimelineData || mockEngagementTimelineData,
      };
    } catch (error) {
      console.error("Failed to fetch video breakdown data:", error);
      throw error;
    }
  };

  // Fetch data when component mounts or filters change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchVideoBreakdownData();
        setEngagementTimelineData(data.engagementTimelineData);
      } catch (error) {
        console.error("Failed to fetch engagement timeline data:", error);
        // Keep using mock data on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYearRange, selectedSentiment, selectedLanguage, keywords]);

  // Line chart configuration for engagement rate trends
  const lineConfig = {
    width: 1244,
    data: engagementTimelineData,
    xField: "date",
    yField: "engagementRate",
    seriesField: "category",
    smooth: true,
    colorField: "category",
    point: {
      size: 4,
      shape: "circle",
    },
    axis: {
      y: { title: "Avg Engagement Score" },
      x: { title: "Time Period" },
    },
    height: 300,
  };

  const tabItems: TabsProps["items"] = [
    // {
    //   key: "1",
    //   label: (
    //     <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    //       <BarChartOutlined />
    //       Engagement Score Trend
    //     </span>
    //   ),
    //   children: (
    //     <div style={{ padding: "24px", textAlign: "center", color: "#999" }}>
    //       {/* �📈 Row 4 – Engagement Rate Timeline */}
    //       <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
    //         <Col xs={24}>
    //           <Card
    //             title={
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   gap: "8px",
    //                 }}
    //               >
    //                 <LineChartOutlined style={{ color: "#5A6ACF" }} />
    //                 <span
    //                   style={{
    //                     color: "#5A6ACF",
    //                     fontSize: "18px",
    //                     fontWeight: 600,
    //                   }}
    //                 >
    //                   Engagement Score Trends by Category
    //                 </span>
    //               </div>
    //             }
    //             extra={
    //               <div style={{ fontSize: "12px", color: "#8B92B8" }}>
    //                 Track engagement performance over time by category
    //               </div>
    //             }
    //             style={{
    //               borderRadius: "12px",
    //               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    //             }}
    //             headStyle={{
    //               background: "#fafbfc",
    //               borderBottom: "1px solid #f0f2f7",
    //             }}
    //           >
    //             <div style={{ height: "300px", padding: "16px 0" }}>
    //               {loading ? (
    //                 <div
    //                   style={{
    //                     display: "flex",
    //                     justifyContent: "center",
    //                     alignItems: "center",
    //                     height: "100%",
    //                   }}
    //                 >
    //                   <Spin size="large" tip="Loading engagement trends..." />
    //                 </div>
    //               ) : (
    //                 <Line {...lineConfig} />
    //               )}
    //             </div>
    //           </Card>
    //         </Col>
    //       </Row>
    //     </div>
    //   ),
    // },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <VideoCameraOutlined />
          Video Content Optimisation Strategy
        </span>
      ),
      children: (
        <div style={{ padding: "24px", textAlign: "center", color: "#999" }}>
          {/* � Row 3 – Category Management Strategies */}
          <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <BulbOutlined style={{ color: "#5A6ACF" }} />
                    <span
                      style={{
                        color: "#5A6ACF",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Video Content Optimization Strategy
                    </span>
                  </div>
                }
                extra={
                  <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                    Optimization recommendations based on best-performing
                    content patterns
                  </div>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                headStyle={{
                  background: "#fafbfc",
                  borderBottom: "1px solid #f0f2f7",
                }}
              >
                <Table
                  dataSource={mockBestVideoTopicData.map((item, index) => ({
                    key: index + 1,
                    ...item,
                  }))}
                  columns={[
                    {
                      title: "Topic Category",
                      dataIndex: "topic",
                      key: "topic",
                      width: "12%",
                      render: (text: string) => (
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#5A6ACF",
                            textTransform: "capitalize",
                          }}
                        >
                          {text}
                        </div>
                      ),
                    },
                    {
                      title: "Recommended Keywords",
                      dataIndex: "keywords",
                      key: "keywords",
                      width: "20%",
                      render: (keywords: string[]) => (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                          }}
                        >
                          {keywords.map((keyword, index) => (
                            <Tag
                              key={index}
                              color="blue"
                              style={{
                                fontSize: "11px",
                                margin: "2px",
                                borderRadius: "12px",
                              }}
                            >
                              {keyword}
                            </Tag>
                          ))}
                        </div>
                      ),
                    },
                    {
                      title: "Optimal Duration",
                      dataIndex: "bestDurationGroup",
                      key: "bestDurationGroup",
                      width: "12%",
                      render: (duration: string) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <ClockCircleOutlined
                            style={{ color: "#52c41a", fontSize: "14px" }}
                          />
                          <span
                            style={{
                              fontWeight: 600,
                              color: "#52c41a",
                              fontSize: "17px",
                            }}
                          >
                            {duration}
                          </span>
                        </div>
                      ),
                    },
                    {
                      title: "Best Publishing Day",
                      dataIndex: "bestDay",
                      key: "bestDay",
                      width: "12%",
                      render: (day: string) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <CalendarOutlined
                            style={{ color: "#FF6961", fontSize: "14px" }}
                          />
                          <span style={{ fontWeight: 600, color: "#FF6961" }}>
                            {day}
                          </span>
                        </div>
                      ),
                    },
                    {
                      title: "Optimal Time",
                      dataIndex: "bestTime",
                      key: "bestTime",
                      width: "10%",
                      render: (time: number) => (
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: 600,
                            color: "#722ed1",
                            fontSize: "17px",
                          }}
                        >
                          {time}:00
                        </div>
                      ),
                    },
                    // {
                    //   title: "Title Length",
                    //   dataIndex: "bestTitleLength",
                    //   key: "bestTitleLength",
                    //   width: "12%",
                    //   render: (length: string) => (
                    //     <div
                    //       style={{
                    //         textAlign: "center",
                    //         fontWeight: 600,
                    //         color: "#eb2f96",
                    //       }}
                    //     >
                    //       {length}
                    //     </div>
                    //   ),
                    // },
                    {
                      title: "Top Hashtags",
                      dataIndex: "top5Hashtags",
                      key: "top5Hashtags",
                      width: "18%",
                      render: (hashtags: string[]) => (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                          }}
                        >
                          {hashtags.map((hashtag, index) => (
                            <Tag
                              key={index}
                              color="purple"
                              style={{
                                fontSize: "11px",
                                margin: "2px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <TagOutlined style={{ fontSize: "10px" }} />
                              {hashtag}
                            </Tag>
                          ))}
                        </div>
                      ),
                    },
                    {
                      title: "Avg Engagement",
                      dataIndex: "avgEngagement",
                      key: "avgEngagement",
                      width: "10%",
                      render: (rate: number) => (
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: 600,
                            color: "#faad14",
                            fontSize: "17px",
                          }}
                        >
                          {rate}%
                        </div>
                      ),
                    },
                    {
                      title: "Best Engagement",
                      dataIndex: "bestEngagement",
                      key: "bestEngagement",
                      width: "10%",
                      render: (rate: number) => (
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: 600,
                            color: "#52c41a",
                            fontSize: "17px",
                          }}
                        >
                          {rate}%
                        </div>
                      ),
                    },
                    {
                      title: "Potential Increase",
                      dataIndex: "perentIncrease",
                      key: "perentIncrease",
                      width: "12%",
                      render: (increase: number) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#f6ffed",
                              border: "1px solid #b7eb8f",
                              borderRadius: "16px",
                              padding: "4px 8px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <ArrowUpOutlined
                              style={{
                                color: "#52c41a",
                                fontSize: "12px",
                              }}
                            />
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#52c41a",
                                fontSize: "15px",
                              }}
                            >
                              +{increase}%
                            </span>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                  pagination={false}
                  size="middle"
                  scroll={{ x: 1200 }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserOutlined />
          Brand View
        </span>
      ),
      children: (
        <div style={{ padding: "24px", textAlign: "center", color: "#999" }}>
          {/* �📈 Row 4 – Engagement Rate Timeline */}
          <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <LineChartOutlined style={{ color: "#5A6ACF" }} />
                    <span
                      style={{
                        color: "#5A6ACF",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      Engagement Score Trends by Category
                    </span>
                  </div>
                }
                extra={
                  <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                    Track engagement performance over time by category
                  </div>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                headStyle={{
                  background: "#fafbfc",
                  borderBottom: "1px solid #f0f2f7",
                }}
              >
                <div style={{ height: "300px", padding: "16px 0" }}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Spin size="large" tip="Loading engagement trends..." />
                    </div>
                  ) : (
                    <Line {...lineConfig} />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
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
              <Col xs={24} sm={8} md={8}>
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
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
};

export default InternalMarketing;
