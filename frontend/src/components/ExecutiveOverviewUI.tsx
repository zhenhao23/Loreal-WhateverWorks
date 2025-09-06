import { Row, Col, Card, Progress } from "antd";
import { Pie } from "@ant-design/plots";
import ReactSpeedometer from "react-d3-speedometer";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  UserOutlined,
  SafetyOutlined,
  MessageOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

import type { ExecutiveOverviewData } from "./ExecutiveOverviewMockData";

interface ExecutiveOverviewUIProps {
  data: ExecutiveOverviewData;
}

const ExecutiveOverviewUI = ({ data }: ExecutiveOverviewUIProps) => {
  const {
    sentimentData,
    overallSentimentScore,
    timelineData,
    metricsData,
    categoryData,
  } = data;

  const pieConfig = {
    autoFit: false,
    data: sentimentData,
    angleField: "value",
    colorField: "type",
    scale: {
      color: {
        range: ["#FF6961", "#FFB54C", "#8CD47E"],
      },
    },
    radius: 0.9,
    innerRadius: 0.5,
    label: {
      text: "percentage",
      position: "outside",
    },
    interactions: [{ type: "element-active" }],
    legend: {
      color: {
        position: "right",
      },
    },
    statistic: {
      title: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#666",
        },
        content: "Comments",
      },
      content: {
        style: {
          fontSize: "20px",
          fontWeight: 700,
          color: "#333",
        },
        content: "24.5K",
      },
    },
    width: 422,
    height: 200,
  };

  return (
    <div style={{ padding: "0 4px" }}>
      {/* 📌 Row 1 – Key Metric Cards (Snapshot KPIs) */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Engagement Coverage */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    color: "#5A6ACF",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {metricsData.totalComments.toLocaleString()}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  Total Comments Analyzed
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <UserOutlined
                    style={{ color: "#707FDD", fontSize: "14px" }}
                  />
                  <span
                    style={{
                      color: "#707FDD",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {metricsData.uniqueUsers.toLocaleString()}
                  </span>
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Unique Users
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Language & Quality */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    color: "#707FDD",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {metricsData.englishPercentage}%
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  English vs Non-English
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <SafetyOutlined
                    style={{ color: "#FF6961", fontSize: "14px" }}
                  />
                  <span
                    style={{
                      color: "#FF6961",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {metricsData.spamPercentage}%
                  </span>
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Spam Detected
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Engagement Depth */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    color: "#44c5e1",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {metricsData.avgLikesPerComment}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  Avg Likes per Comment
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <MessageOutlined
                    style={{ color: "#60ccefff", fontSize: "14px" }}
                  />
                  <span
                    style={{
                      color: "#60ccefff",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {metricsData.avgRepliesPerComment}
                  </span>
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Avg Replies per Comment
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Engagement Quality */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(90, 106, 207, 0.15)",
              border: "2px solid #5A6ACF",
              height: "140px",
              background: "linear-gradient(135deg, #5A6ACF 0%, #707FDD 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                color: "white",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {metricsData.avgKpiScore}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  Avg KPI Score per Comment
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "11px",
                    marginTop: "6px",
                    background: "rgba(255,255,255,0.2)",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  ↗ +{metricsData.kpiScoreChange}% vs last month
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📊 Row 2 – Sentiment Overview (Macro View) */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Left: Sentiment Distribution (Semi-Donut Chart) */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <PieChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Sentiment Distribution
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div style={{ height: "320px", padding: "8px" }}>
              <Row gutter={[16, 0]} style={{ height: "100%" }}>
                {/* Left: Overall Sentiment Gauge */}
                <Col xs={24} md={12}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#5A6ACF",
                        marginBottom: "8px",
                        textAlign: "center",
                      }}
                    >
                      Overall Sentiment Level
                    </div>
                    <div
                      style={{
                        height: "200px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ReactSpeedometer
                        maxValue={5}
                        value={overallSentimentScore}
                        needleColor="#5A6ACF"
                        needleHeightRatio={0.7}
                        startColor="#FF6961"
                        segments={3}
                        segmentColors={["#FF6961", "#FFB54C", "#8CD47E"]}
                        endColor="#8CD47E"
                        textColor="#5A6ACF"
                        valueTextFontSize="24px"
                        labelFontSize="12px"
                        currentValueText={`${overallSentimentScore}/5`}
                        paddingVertical={20}
                        customSegmentLabels={[
                          {
                            text: "Negative",
                            color: "#fff",
                            fontSize: "10px",
                          },
                          {
                            text: "Neutral",
                            color: "#fff",
                            fontSize: "10px",
                          },
                          {
                            text: "Positive",
                            color: "#fff",
                            fontSize: "10px",
                          },
                        ]}
                        ringWidth={20}
                        needleTransitionDuration={1000}
                        width={200}
                        height={150}
                      />
                      <div
                        style={{
                          marginTop: "8px",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ fontSize: "22px", marginRight: "8px" }}>
                          {overallSentimentScore >= 3.33
                            ? "😊"
                            : overallSentimentScore >= 1.66
                            ? "😐"
                            : "😞"}
                        </span>
                        <span
                          style={{
                            color:
                              overallSentimentScore >= 3.33
                                ? "#8CD47E"
                                : overallSentimentScore >= 1.66
                                ? "#FFB54C"
                                : "#FF6961",
                          }}
                        >
                          {overallSentimentScore >= 3.33
                            ? "Positive"
                            : overallSentimentScore >= 1.66
                            ? "Neutral"
                            : "Negative"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right: Comments Sentiment Distribution */}
                <Col xs={24} md={12}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#5A6ACF",
                        marginBottom: "8px",
                        textAlign: "center",
                      }}
                    >
                      Comments by Sentiment
                    </div>
                    <div style={{ height: "200px", width: "100%" }}>
                      <Pie {...pieConfig} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Right: Comments by Category */}
        <Col xs={24} lg={8}>
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
                  By Category
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              height: "400px",
            }}
            headStyle={{
              background: "#fafbfc",
              borderBottom: "1px solid #f0f2f7",
            }}
          >
            <div style={{ padding: "0" }}>
              {categoryData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#333", fontWeight: 600 }}>
                      {item.category}
                    </span>
                    <span style={{ color: item.color, fontWeight: 700 }}>
                      {item.value}%
                    </span>
                  </div>
                  <Progress
                    percent={item.value}
                    strokeColor={item.color}
                    showInfo={false}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📈 Row 3 – Sentiment Timeline (Trend Analysis) */}
      <Row gutter={[24, 24]}>
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
                  Sentiment Timeline - Comments Volume & Average Score
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                Click bars to drill-down: Year → Month → Day
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
            <div style={{ height: "300px", padding: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                  />
                  <YAxis
                    yAxisId="comments"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                    label={{
                      value: "Number of Comments",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fill: "#666",
                        fontSize: "12px",
                      },
                    }}
                  />
                  <YAxis
                    yAxisId="sentiment"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                    domain={[0, 10]}
                    label={{
                      value: "Average Sentiment Score",
                      angle: 90,
                      position: "insideRight",
                      style: {
                        textAnchor: "middle",
                        fill: "#666",
                        fontSize: "12px",
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value, name) => [
                      typeof name === "string" && name.includes("Sentiment")
                        ? `${value}/10`
                        : `${value} comments`,
                      name,
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "0px", paddingBottom: "20px" }}
                    verticalAlign="top"
                  />
                  <Bar
                    yAxisId="comments"
                    dataKey="positive"
                    stackId="sentiment"
                    fill="#8CD47E"
                    radius={[0, 0, 0, 0]}
                    name="Positive"
                  />
                  <Bar
                    yAxisId="comments"
                    dataKey="neutral"
                    stackId="sentiment"
                    fill="#FFB54C"
                    radius={[0, 0, 0, 0]}
                    name="Neutral"
                  />
                  <Bar
                    yAxisId="comments"
                    dataKey="negative"
                    stackId="sentiment"
                    fill="#FF6961"
                    radius={[4, 4, 0, 0]}
                    name="Negative"
                  />
                  <Line
                    yAxisId="sentiment"
                    type="monotone"
                    dataKey="avgSentiment"
                    stroke="#5A6ACF"
                    strokeWidth={3}
                    dot={{ fill: "#5A6ACF", strokeWidth: 2, r: 5 }}
                    name="Sentiment Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExecutiveOverviewUI;
