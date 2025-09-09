import { Card, Row, Col, Table } from "antd";
import {
  VideoCameraOutlined,
  BarChartOutlined,
  TrophyOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  RiseOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Bar, Line } from "@ant-design/plots";
import type { ColumnsType } from "antd/es/table";
import type { VideoBreakdownData } from "./VideoBreakdownMockData";

interface VideoBreakdownUIProps {
  data: VideoBreakdownData;
  onPaginationChange?: (page: number, pageSize: number) => void;
  loading?: boolean;
}

const VideoBreakdownUI = ({
  data,
  onPaginationChange,
  loading = false,
}: VideoBreakdownUIProps) => {
  const {
    videoCategoryData,
    categoryLeaderboardData,
    videoMetrics,
    engagementTimelineData,
  } = data;

  // Handle both paginated and array data formats
  const leaderboardData = Array.isArray(categoryLeaderboardData)
    ? categoryLeaderboardData
    : categoryLeaderboardData?.data || [];

  const paginationConfig = Array.isArray(categoryLeaderboardData)
    ? {
        current: 1,
        pageSize: 10,
        total: categoryLeaderboardData.length,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total} categories`,
      }
    : {
        current: categoryLeaderboardData?.current || 1,
        pageSize: categoryLeaderboardData?.pageSize || 10,
        total: categoryLeaderboardData?.total || 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total} categories`,
        onChange: onPaginationChange,
        onShowSizeChange: onPaginationChange,
      };

  // Bar chart configuration (vertical bar chart like Sentiment Score by Topic)
  const barConfig = {
    legend: false,
    data: videoCategoryData,
    xField: "topic",
    yField: "videos",
    colorField: "topic",
    scale: {
      color: {
        range: videoCategoryData.map((item) => item.color),
      },
    },
    barWidthRatio: 0.8,
    intervalPadding: 0.1,
    dodgePadding: 0,
    barStyle: {
      height: 30,
    },
    meta: {
      videos: {
        alias: "Number of Videos",
        formatter: (v: number) => v.toLocaleString(),
      },
    },
    xAxis: {
      min: 0,
      max: Math.max(...videoCategoryData.map((item) => item.videos)) * 1.1,
      tickCount: 6,
      label: {
        formatter: (v: string) => `${parseInt(v).toLocaleString()}`,
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
        offset: 10,
      },
    },
    label: {
      position: "right" as const,
      style: {
        fill: "#444",
        fontSize: 12,
        fontWeight: 600,
        dx: 40,
      },
    },
    width: 875,
    height: 376,
  };

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
      y: { title: "Engagement Rate (%)" },
      x: { title: "Time Period" },
    },
    height: 300,
  };

  // Table columns configuration
  const columns: ColumnsType<any> = [
    {
      title: "Video Category",
      dataIndex: "category",
      key: "category",
      width: "18%",
      render: (text: string) => (
        <div style={{ fontWeight: 600, color: "#5A6ACF" }}>{text}</div>
      ),
    },
    {
      title: "Engagement Rate",
      dataIndex: "engagementRate",
      key: "engagementRate",
      width: "12%",
      sorter: (a, b) => a.engagementRate - b.engagementRate,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value >= 4.5 ? "#52c41a" : value >= 3.5 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {value?.toFixed(1) || "0.0"}%
        </div>
      ),
    },
    {
      title: "Total Videos",
      dataIndex: "videoCount",
      key: "videoCount",
      width: "10%",
      sorter: (a, b) => a.videoCount - b.videoCount,
      render: (value: number) => (
        <div style={{ fontWeight: 600, textAlign: "center" }}>
          {value?.toLocaleString() || "0"}
        </div>
      ),
    },
    {
      title: "Total Views",
      dataIndex: "totalViews",
      key: "totalViews",
      width: "12%",
      sorter: (a, b) => a.totalViews - b.totalViews,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>
          {value ? (value / 1000000).toFixed(1) + "M" : "0"}
        </div>
      ),
    },
    {
      title: "Total Likes",
      dataIndex: "totalLikes",
      key: "totalLikes",
      width: "12%",
      sorter: (a, b) => a.totalLikes - b.totalLikes,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>
          {value ? (value / 1000).toFixed(0) + "K" : "0"}
        </div>
      ),
    },
    {
      title: "Total Comments",
      dataIndex: "totalComments",
      key: "totalComments",
      width: "12%",
      sorter: (a, b) => a.totalComments - b.totalComments,
      render: (value: number) => (
        <div style={{ textAlign: "center" }}>
          {value ? (value / 1000).toFixed(0) + "K" : "0"}
        </div>
      ),
    },
    {
      title: "Avg Quality Score",
      dataIndex: "avgQualityScore",
      key: "avgQualityScore",
      width: "12%",
      sorter: (a, b) => a.avgQualityScore - b.avgQualityScore,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value >= 8.5 ? "#52c41a" : value >= 7.5 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {value}/10
        </div>
      ),
    },
    {
      title: "Spam %",
      dataIndex: "spamPercentage",
      key: "spamPercentage",
      width: "8%",
      sorter: (a, b) => a.spamPercentage - b.spamPercentage,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value <= 2.5 ? "#52c41a" : value <= 4.0 ? "#faad14" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {Math.round(value)}%
        </div>
      ),
    },
    {
      title: "Avg Sentiment",
      dataIndex: "avgSentimentScore",
      key: "avgSentimentScore",
      width: "12%",
      sorter: (a, b) => a.avgSentimentScore - b.avgSentimentScore,
      render: (value: number) => (
        <div
          style={{
            fontWeight: 600,
            color:
              value > 6.67 ? "#52c41a" : value < 3.33 ? "#ff4d4f" : "#faad14",
            textAlign: "center",
          }}
        >
          {value}/10
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 4px" }}>
      {/* � Row 1 – Key Metrics Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Average Engagement Rate */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
            bodyStyle={{ padding: "20px", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <RiseOutlined
                style={{
                  fontSize: "24px",
                  color: "#95de64",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#95de64",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {videoMetrics?.average_engagement_rate?.toFixed(1) || "0.0"}%
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Avg Engagement Rate
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Views */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
            bodyStyle={{ padding: "20px", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <EyeOutlined
                style={{
                  fontSize: "24px",
                  color: "#69c0ff",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#69c0ff",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {videoMetrics?.total_views
                  ? (videoMetrics.total_views / 1000000).toFixed(1) + "M"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Total Views
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Likes */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
            bodyStyle={{ padding: "20px", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <HeartOutlined
                style={{
                  fontSize: "24px",
                  color: "#ff9c6e",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#ff9c6e",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {videoMetrics?.total_likes
                  ? (videoMetrics.total_likes / 1000000).toFixed(1) + "M"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Total Likes
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Comments */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
            bodyStyle={{ padding: "20px", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <MessageOutlined
                style={{
                  fontSize: "24px",
                  color: "#b37feb",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#b37feb",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {videoMetrics?.total_comments
                  ? (videoMetrics.total_comments / 1000).toFixed(0) + "K"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Total Comments
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* �📊 Row 2 – Video Statistics Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }} align="middle">
        {/* Left: Total Videos and Categories Cards */}
        <Col xs={24} lg={6}>
          <Row gutter={[0, 16]}>
            {/* Total Videos Card */}
            <Col xs={24}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(90, 106, 207, 0.15)",
                  border: "2px solid #5A6ACF",
                  height: "220px",
                  background:
                    "linear-gradient(135deg, #5A6ACF 0%, #707FDD 100%)",
                }}
                bodyStyle={{ padding: 0, height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <VideoCameraOutlined
                    style={{
                      fontSize: "36px",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "white",
                      fontSize: "42px",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {videoMetrics?.total_videos?.toLocaleString() || "0"}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Videos Analyzed
                  </div>
                </div>
              </Card>
            </Col>

            {/* Categories Card */}
            <Col xs={24}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid #f0f2f7",
                  height: "220px",
                }}
                bodyStyle={{ padding: 0, height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <BarChartOutlined
                    style={{
                      fontSize: "36px",
                      color: "#5A6ACF",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "#5A6ACF",
                      fontSize: "42px",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {videoMetrics?.unique_categories || 0}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Video Categories
                  </div>
                  <div
                    style={{
                      color: "#8B92B8",
                      fontSize: "12px",
                      background: "#f5f6fa",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      display: "inline-block",
                    }}
                  >
                    Wikipedia Tags
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right: Video Distribution Bar Chart */}
        <Col xs={24} lg={18}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <BarChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Video Engagement by Category
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "456px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div style={{ height: "376px", padding: "0" }}>
              <Bar {...barConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📈 Row 3 – Engagement Rate Timeline */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <LineChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Engagement Rate Trends by Category
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
              <Line {...lineConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 🏆 Row 4 – Category Leaderboard Table */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TrophyOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Category Performance Leaderboard
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                Click column headers to sort • Higher scores = better
                performance
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
              dataSource={leaderboardData}
              columns={columns}
              rowKey="key"
              loading={loading}
              pagination={paginationConfig}
              size="middle"
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VideoBreakdownUI;
