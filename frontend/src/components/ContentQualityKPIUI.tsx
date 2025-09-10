import { Row, Col, Card, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined,
  CloudOutlined,
  TableOutlined,
  DotChartOutlined,
  HeartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Bar as BarRecharts,
  Line,
  Legend,
} from "recharts";

import type { ColumnsType } from "antd/es/table";
import type { ContentQualityKPIData } from "./ContentQualityKPIMockData";

interface ContentQualityKPIUIProps {
  data: ContentQualityKPIData;
}

const ContentQualityKPIUI = ({ data }: ContentQualityKPIUIProps) => {
  const {
    kpiMetrics,
    topKeywords,
    wordCloudData,
    topComments,
    bubbleData,
    timelineData,
  } = data;

  // Custom bubble component for scatter chart
  const CustomBubble = (props: any) => {
    const { cx, cy, payload } = props;

    // Define colors based on sentiment
    const getColor = (sentiment: string) => {
      switch (sentiment) {
        case "positive":
          return "#52c41a";
        case "neutral":
          return "#faad14";
        case "negative":
          return "#ff4d4f";
        default:
          return "#666";
      }
    };

    // Use z value for radius, with some scaling
    const radius = Math.max(4, payload.z * 0.4); // Minimum radius of 4, scale z value

    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={getColor(payload.sentiment)}
        fillOpacity={0.7}
        stroke={getColor(payload.sentiment)}
        strokeWidth={2}
        strokeOpacity={1}
      />
    );
  };

  const commentColumns: ColumnsType<any> = [
    {
      title: "Comment Text",
      dataIndex: "comment",
      key: "comment",
      width: "45%",
      render: (text: string) => (
        <div
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            maxWidth: "400px",
          }}
          dangerouslySetInnerHTML={{
            __html: text.replace(
              /\*\*(.*?)\*\*/g,
              '<strong style="color: #5A6ACF;">$1</strong>'
            ),
          }}
        />
      ),
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
      width: "15%",
      render: (sentiment: string) => {
        const config = {
          positive: { color: "#52c41a", icon: <CheckCircleOutlined /> },
          neutral: { color: "#faad14", icon: <ExclamationCircleOutlined /> },
          negative: { color: "#ff4d4f", icon: <CloseCircleOutlined /> },
        };
        const sentimentConfig = config[sentiment as keyof typeof config];
        return (
          <Tag color={sentimentConfig.color} icon={sentimentConfig.icon}>
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "KPI Score",
      dataIndex: "kpiScore",
      key: "kpiScore",
      width: "15%",
      render: (score: number) => (
        <div style={{ fontWeight: 600, color: "#5A6ACF", fontSize: "16px" }}>
          {score}/10
        </div>
      ),
    },
    {
      title: "Engagement",
      key: "engagement",
      width: "25%",
      render: (record: any) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HeartOutlined style={{ color: "#ff4d4f" }} />
            <span style={{ fontWeight: 600 }}>{record.likes}</span>
            <span style={{ color: "#8c8c8c", fontSize: "12px" }}>likes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageOutlined style={{ color: "#1890ff" }} />
            <span style={{ fontWeight: 600 }}>{record.replies}</span>
            <span style={{ color: "#8c8c8c", fontSize: "12px" }}>replies</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 4px" }}>
      {/* 🔝 Row 1 – KPI Cards (anchor metrics) */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Avg KPI Score */}
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
                  color: "#5A6ACF",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {kpiMetrics.avgKPIScore}
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                Avg KPI Score
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "#8B92B8",
                }}
              >
                <span>Min: {kpiMetrics.minKPIScore}</span>
                <span>Max: {kpiMetrics.maxKPIScore}</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Avg Comment Length */}
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
                  color: "#707FDD",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {kpiMetrics.avgCommentLength}
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                Avg Comment Length
              </div>
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                characters
              </div>
            </div>
          </Card>
        </Col>

        {/* % High-Quality Comments */}
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
                  color: "#44c5e1",
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {kpiMetrics.highQualityPercentage}%
              </div>
              <div
                style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}
              >
                High-Quality Comments
              </div>
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                score ≥ 8.0
              </div>
            </div>
          </Card>
        </Col>

        {/* Top Keywords */}
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
              }}
            >
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginBottom: "8px",
                  fontWeight: 400,
                }}
              >
                Top Keywords by Category
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "12px",
                }}
              >
                {Object.entries(topKeywords).map(([category, keywords]) => (
                  <div
                    key={category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#5A6ACF",
                        fontWeight: 600,
                        minWidth: "60px",
                      }}
                    >
                      {category}:
                    </span>
                    <span style={{ color: "#8B92B8" }}>
                      {keywords.join(", ")}
                    </span>
                  </div>
                ))}
                <div style={{ textAlign: "right", marginTop: "2px" }}>
                  <span
                    style={{
                      color: "#5A6ACF",
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* � Row 2 – Sentiment Timeline (Trend Analysis) */}
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
                  Sentiment Timeline - Comments Volume & Average Score
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                {/* Click bars to drill-down: Year → Month → Day */}
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
                  <BarRecharts
                    yAxisId="comments"
                    dataKey="positive"
                    stackId="sentiment"
                    fill="#8CD47E"
                    radius={[0, 0, 0, 0]}
                    name="Positive"
                  />
                  <BarRecharts
                    yAxisId="comments"
                    dataKey="neutral"
                    stackId="sentiment"
                    fill="#FFB54C"
                    radius={[0, 0, 0, 0]}
                    name="Neutral"
                  />
                  <BarRecharts
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

      {/* 🔎 Row 3 – Human-readable Examples */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TableOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Top 5 Comments - Real Customer Voices
                </span>
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
              dataSource={topComments}
              columns={commentColumns}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      {/* 🔍 Row 4 – Deep Linguistic Analysis & Key Adjectives */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Left: Word Impact Analysis (2/3 width) */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <DotChartOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Word Impact Analysis - Frequency vs Sentiment vs Engagement
                </span>
              </div>
            }
            extra={
              <div style={{ fontSize: "12px", color: "#8B92B8" }}>
                Bubble size = engagement level
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
            <div style={{ height: "320px", padding: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  data={bubbleData}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="frequency"
                    tick={{ fontSize: 12, fill: "#666" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Word Frequency",
                      position: "bottom",
                      style: {
                        textAnchor: "middle",
                        fontSize: "12px",
                        fill: "#666",
                      },
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="sentiment"
                    domain={[0, 10]}
                    tickCount={6}
                    tick={{ fontSize: 12, fill: "#666" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Avg KPI Score",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fontSize: "12px",
                        fill: "#666",
                      },
                    }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      name === "frequency"
                        ? `${value} mentions`
                        : name === "sentiment"
                        ? `${value}/10 score`
                        : `${value} interactions`,
                      name === "frequency"
                        ? "Frequency"
                        : name === "sentiment"
                        ? "KPI Score"
                        : "Engagement",
                    ]}
                    labelFormatter={(_label, payload) =>
                      payload && payload[0] && payload[0].payload
                        ? `Word: "${payload[0].payload.word}"`
                        : ""
                    }
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div
                            style={{
                              backgroundColor: "white",
                              border: "1px solid #f0f0f0",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              padding: "12px",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                marginBottom: "8px",
                                color: "#333",
                              }}
                            >
                              Word: "{data.word}"
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                lineHeight: "1.5",
                              }}
                            >
                              <div>Frequency: {data.x} mentions</div>
                              <div>KPI Score: {data.y}/10</div>
                              <div>Engagement: {data.z} interactions</div>
                              <div
                                style={{
                                  marginTop: "4px",
                                  color:
                                    data.sentiment === "positive"
                                      ? "#52c41a"
                                      : data.sentiment === "neutral"
                                      ? "#faad14"
                                      : "#ff4d4f",
                                  fontWeight: 500,
                                }}
                              >
                                Sentiment:{" "}
                                {data.sentiment.charAt(0).toUpperCase() +
                                  data.sentiment.slice(1)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter
                    name="Words"
                    data={bubbleData}
                    shape={<CustomBubble />}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Right: Word Cloud (1/3 width) */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CloudOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Key Adjectives
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
            <div
              style={{
                height: "320px",
                padding: "16px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              {wordCloudData.map((item, index) => {
                // Calculate font size based on value (min: 14px, max: 36px)
                const fontSize = Math.max(
                  14,
                  Math.min(40, (item.value / 100) * 40)
                );
                // Get color from purple palette based on index
                const colors = [
                  "#5A6ACF",
                  "#8B5CF6",
                  "#44c5e1",
                  "#707FDD",
                  "#ff7875",
                ];
                const color = colors[index % colors.length];

                return (
                  <span
                    key={index}
                    style={{
                      fontSize: `${fontSize}px`,
                      color: color,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      transform:
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)",
                      display: "inline-block",
                      margin: "2px 4px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scale(1.15) ${
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)"
                      }`;
                      e.currentTarget.style.textShadow =
                        "0 2px 8px rgba(90, 106, 207, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `scale(1) ${
                        index % 3 === 0
                          ? "rotate(-5deg)"
                          : index % 3 === 1
                          ? "rotate(5deg)"
                          : "rotate(0deg)"
                      }`;
                      e.currentTarget.style.textShadow =
                        "0 1px 2px rgba(0,0,0,0.1)";
                    }}
                    title={`${item.text}: ${item.value} mentions`}
                  >
                    {item.text}
                  </span>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContentQualityKPIUI;
