import { Row, Col, Card, Progress } from "antd";
import { Pie, Bar as BarChart } from "@ant-design/plots";
import ReactSpeedometer from "react-d3-speedometer";
import {
  VideoCameraOutlined,
  SafetyOutlined,
  MessageOutlined,
  PieChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import type { ExecutiveOverviewData } from "./ExecutiveOverviewMockData";

interface ExecutiveOverviewUIProps {
  data: ExecutiveOverviewData;
}

const ExecutiveOverviewUI = ({ data }: ExecutiveOverviewUIProps) => {
  const {
    sentimentData,
    overallSentimentScore,
    metricsData,
    categoryData,
    sentimentByTopics,
    topChannels,
  } = data;

  const pieConfig = {
    autoFit: false,
    data: sentimentData,
    angleField: "percentage_numeric",
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
    tooltip: {
      title: (d: any) => d.type,
      items: [
        {
          field: "value",
          name: "Comments",
          valueFormatter: (value: number) => value.toLocaleString(),
        },
      ],
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
      {/* 📌 Row 1 – Key Metric Cards (5 cards in one row) */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Avg KPI Score per Comment - Featured */}
        <Col xs={24} sm={12} lg={5}>
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
                  {metricsData?.avgKpiScore || 0}
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
                  ↗ +{metricsData?.kpiScoreChange || 0}% vs last year
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Spam Detected */}
        <Col xs={24} sm={12} lg={5}>
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
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#FF6961",
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {metricsData?.spamPercentage || 0}%
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  Spam Detected
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                  }}
                >
                  <SafetyOutlined
                    style={{ color: "#FF6961", fontSize: "14px" }}
                  />
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Quality Control
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Comments Analyzed */}
        <Col xs={24} sm={12} lg={5}>
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
                  textAlign: "center",
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
                  {(metricsData?.totalComments || 0).toLocaleString()}
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                  }}
                >
                  <MessageOutlined
                    style={{ color: "#707FDD", fontSize: "14px" }}
                  />
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Coverage
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Videos Analyzed */}
        <Col xs={24} sm={12} lg={5}>
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
                  textAlign: "center",
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
                  {(metricsData?.totalVideos || 0).toLocaleString()}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  Total Videos Analyzed
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                  }}
                >
                  <VideoCameraOutlined
                    style={{ color: "#707FDD", fontSize: "14px" }}
                  />
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Content
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* English vs Non-English */}
        <Col xs={24} sm={12} lg={4}>
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
                  textAlign: "center",
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
                  {metricsData?.englishPercentage || 0}%
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#8B92B8", fontSize: "12px" }}>
                    Language Distribution
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📊 Row 2 – KPI by Category & Comments by Category */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        {/* Left: KPI by Category (2/3 width) */}
        <Col xs={24} lg={16}>
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
                  KPI by Category
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
            <div style={{ height: "320px", padding: 0 }}>
              <BarChart
                legend={false}
                data={sentimentByTopics}
                xField="topic"
                yField="score"
                colorField="topic"
                scale={{
                  color: {
                    range: sentimentByTopics.map((item) => item.color),
                  },
                }}
                barWidthRatio={0.8}
                intervalPadding={0.1}
                dodgePadding={0}
                barStyle={{
                  height: 30,
                }}
                meta={{
                  score: {
                    alias: "Sentiment Score",
                    formatter: (v: number) => `${(v * 100).toFixed(1)}%`,
                  },
                }}
                xAxis={{
                  min: 0,
                  max: 1,
                  tickCount: 6,
                  label: {
                    formatter: (v: number) => `${(v * 100).toFixed(0)}%`,
                  },
                }}
                yAxis={{
                  label: {
                    autoRotate: false,
                    offset: 10,
                  },
                }}
                label={{
                  position: "right",
                  style: {
                    fill: "#444",
                    fontSize: 12,
                    fontWeight: 600,
                    dx: 32,
                  },
                }}
                // width={875}
                height={320}
              />
            </div>
          </Card>
        </Col>

        {/* Right: Videos Count by Category (1/3 width) */}
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
                  Videos Count by Category
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

      {/* 📊 Row 3 – Sentiment Distribution */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24}>
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
                        maxValue={10}
                        minValue={0}
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
                        currentValueText={`${overallSentimentScore}/10`}
                        paddingVertical={20}
                        customSegmentStops={[0, 3.33, 6.67, 10]}
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
                          {overallSentimentScore >= 6.67
                            ? "😊"
                            : overallSentimentScore >= 3.33
                            ? "😐"
                            : "😞"}
                        </span>
                        <span
                          style={{
                            color:
                              overallSentimentScore >= 6.67
                                ? "#8CD47E"
                                : overallSentimentScore >= 3.33
                                ? "#FFB54C"
                                : "#FF6961",
                          }}
                        >
                          {overallSentimentScore >= 6.67
                            ? "Positive"
                            : overallSentimentScore >= 3.33
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
      </Row>

      {/* 🏆 Row 5 – Top 3 Channels */}
      <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
        <Col xs={24}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <VideoCameraOutlined style={{ color: "#5A6ACF" }} />
                <span
                  style={{
                    color: "#5A6ACF",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Top 3 Channels by Engagement
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
            <Row gutter={[24, 16]}>
              {topChannels?.map((channel, index) => (
                <Col xs={24} md={8} key={channel.channelId}>
                  <Card
                    style={{
                      borderRadius: "8px",
                      border:
                        index === 0 ? "2px solid #FFD700" : "1px solid #f0f2f7",
                      boxShadow:
                        index === 0
                          ? "0 4px 12px rgba(255, 215, 0, 0.2)"
                          : "0 2px 6px rgba(0,0,0,0.04)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Ranking Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor:
                          index === 0
                            ? "#FFD700"
                            : index === 1
                            ? "#C0C0C0"
                            : "#CD7F32",
                        color: "white",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        zIndex: 1,
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Channel Info */}
                    <div style={{ padding: "8px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <img
                          src={channel.avatar}
                          alt={channel.name}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            border: "2px solid #f0f2f7",
                            objectFit: "cover",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#333",
                              marginBottom: "2px",
                              lineHeight: 1.2,
                            }}
                          >
                            {channel.name}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#8B92B8",
                            }}
                          >
                            {channel.subscribers} subscribers
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div style={{ marginBottom: "12px" }}>
                        <Row gutter={[8, 8]}>
                          <Col span={12}>
                            <div style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#5A6ACF",
                                }}
                              >
                                {channel.totalComments.toLocaleString()}
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#8B92B8",
                                }}
                              >
                                Comments
                              </div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#707FDD",
                                }}
                              >
                                {channel.avgSentiment.toFixed(1)}
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#8B92B8",
                                }}
                              >
                                Avg Sentiment
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* Engagement Badge */}
                      <div
                        style={{
                          textAlign: "center",
                          backgroundColor: index === 0 ? "#FFF9E6" : "#F8F9FF",
                          padding: "6px 12px",
                          borderRadius: "16px",
                          border: `1px solid ${
                            index === 0 ? "#FFE58F" : "#E8EAFF"
                          }`,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: index === 0 ? "#D48806" : "#5A6ACF",
                          }}
                        >
                          {channel.engagementRate}% Engagement
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExecutiveOverviewUI;
