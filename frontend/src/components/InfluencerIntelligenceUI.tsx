import { Card, Row, Col, Select, Button, Space, Typography } from "antd";
import { useState } from "react";
import {
  RiseOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  TrophyOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Radar, Bar } from "@ant-design/plots";
import type { InfluencerIntelligenceData } from "./InfluencerIntelligenceMockData";

interface InfluencerIntelligenceUIProps {
  data: InfluencerIntelligenceData;
  loading?: boolean;
}

const InfluencerIntelligenceUI = ({
  data,
  loading = false,
}: InfluencerIntelligenceUIProps) => {
  const {
    influencerMetrics,
    influencerInfo,
    radarData,
    categoryRadarData,
    influencerBarData,
  } = data;

  // State for influencer selection
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>(
    influencerBarData[0]?.influencer || "Jane Doe"
  );

  // Get list of influencer names for dropdown
  const influencerOptions = influencerBarData.map((influencer) => ({
    value: influencer.influencer,
    label: influencer.influencer,
  }));

  // Handle influencer navigation
  const handlePreviousInfluencer = () => {
    const currentIndex = influencerBarData.findIndex(
      (inf) => inf.influencer === selectedInfluencer
    );
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : influencerBarData.length - 1;
    setSelectedInfluencer(influencerBarData[previousIndex].influencer);
  };

  const handleNextInfluencer = () => {
    const currentIndex = influencerBarData.findIndex(
      (inf) => inf.influencer === selectedInfluencer
    );
    const nextIndex =
      currentIndex < influencerBarData.length - 1 ? currentIndex + 1 : 0;
    setSelectedInfluencer(influencerBarData[nextIndex].influencer);
  };

  // Radar chart configuration for performance metrics
  const radarConfig = {
    data: radarData,
    xField: "attribute",
    yField: "score",
    coordinateType: "polar" as const,
    axis: {
      x: {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
        line: false,
        label: {
          style: {
            fontSize: 12,
            fill: "#666",
          },
        },
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: "line" as const,
        gridLineWidth: 1,
        gridLineDash: [0, 0],
        label: {
          formatter: (text: string) => `${text}%`,
        },
      },
    },
    area: {
      style: {
        fillOpacity: 0.3,
        fill: "#5A6ACF",
      },
    },
    point: {
      size: 4,
      style: {
        fill: "#5A6ACF",
        stroke: "#fff",
        lineWidth: 2,
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 100, domainMin: 0 },
    },
    style: {
      lineWidth: 3,
      stroke: "#5A6ACF",
    },
    height: 400,
    legend: false,
  };

  // Radar chart configuration for category performance
  const categoryRadarConfig = {
    data: categoryRadarData,
    xField: "attribute",
    yField: "score",
    coordinateType: "polar" as const,
    axis: {
      x: {
        grid: true,
        gridLineWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
        line: false,
        label: {
          style: {
            fontSize: 12,
            fill: "#666",
          },
        },
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: "line" as const,
        gridLineWidth: 1,
        gridLineDash: [0, 0],
        label: {
          formatter: (text: string) => `${text}%`,
        },
      },
    },
    area: {
      style: {
        fillOpacity: 0.3,
        fill: "#ff7a45",
      },
    },
    point: {
      size: 4,
      style: {
        fill: "#ff7a45",
        stroke: "#fff",
        lineWidth: 2,
      },
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 100, domainMin: 0 },
    },
    style: {
      lineWidth: 3,
      stroke: "#ff7a45",
    },
    height: 400,
    legend: false,
  };

  // Bar chart configuration (matches Video Engagement by Category style)
  const barConfig = {
    legend: false,
    data: influencerBarData,
    xField: "influencer",
    yField: "engagementQuality",
    colorField: "influencer",
    scale: {
      color: {
        range: influencerBarData.map((item) => item.color),
      },
    },
    barWidthRatio: 0.8,
    intervalPadding: 0.1,
    dodgePadding: 0,
    barStyle: {
      height: 30,
    },
    meta: {
      engagementQuality: {
        alias: "Audience Engagement Quality",
        formatter: (v: number) => `${v}%`,
      },
    },
    xAxis: {
      min: 0,
      max:
        Math.max(...influencerBarData.map((item) => item.engagementQuality)) *
        1.1,
      tickCount: 6,
      label: {
        formatter: (v: string) => `${parseInt(v)}%`,
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

  return (
    <div style={{ padding: "0 4px" }}>
      {/* 📊 Row 1 – Influencer Overview and Bar Chart */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }} align="middle">
        {/* Left: Top Creator and Category Cards (1/4 width) */}
        <Col xs={24} lg={6}>
          <Row gutter={[0, 16]}>
            {/* Top-Performing Creator Card */}
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
                  <TrophyOutlined
                    style={{
                      fontSize: "36px",
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: "6px",
                    }}
                  >
                    {influencerInfo?.topPerformingCreator || "N/A"}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Top-Performing Creator
                  </div>
                </div>
              </Card>
            </Col>

            {/* Highest Potential Category Card */}
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
                  <StarOutlined
                    style={{
                      fontSize: "36px",
                      color: "#5A6ACF",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      color: "#5A6ACF",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {influencerInfo?.highestPotentialCategory || "N/A"}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Highest Potential Category
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
                    Growth Opportunity
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right: Influencer Engagement Quality Bar Chart (3/4 width) */}
        <Col xs={24} lg={18}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{ fontSize: "18px", fontWeight: 600, color: "#333" }}
                >
                  Influencer Engagement Quality Ranking
                </span>
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "456px",
            }}
            bodyStyle={{ padding: "24px", height: "calc(100% - 57px)" }}
          >
            <Bar {...barConfig} />
          </Card>
        </Col>
      </Row>

      {/* 🎯 Influencer Selection Filter */}
      <div
        style={{
          padding: "24px 0",
          borderBottom: "1px solid #f0f2f7",
          marginBottom: "32px",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Row justify="center" align="middle">
          <Col>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <Typography.Text
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                <UserOutlined style={{ marginRight: "8px" }} />
                Select Influencer
              </Typography.Text>
            </div>
            <Space size="large" align="center">
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={handlePreviousInfluencer}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  color: "#64748b",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                }}
              />

              <Select
                value={selectedInfluencer}
                onChange={setSelectedInfluencer}
                options={influencerOptions}
                style={{
                  width: 280,
                  fontSize: "16px",
                }}
                size="large"
                placeholder="Choose an influencer"
              />

              <Button
                type="text"
                icon={<RightOutlined />}
                onClick={handleNextInfluencer}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  color: "#64748b",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                }}
              />
            </Space>
          </Col>
        </Row>
      </div>

      {/* 📊 Row 2 – Key Metrics Overview */}
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
                  color: "#73d13d",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#73d13d",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {influencerMetrics?.avgEngagementRate?.toFixed(1) || "0.0"}%
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

        {/* Average Views */}
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
                  color: "#40a9ff",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#40a9ff",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {influencerMetrics?.avgViews
                  ? (influencerMetrics.avgViews / 1000000).toFixed(1) + "M"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Avg Views
              </div>
            </div>
          </Card>
        </Col>

        {/* Average Likes */}
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
                  color: "#ff7a45",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#ff7a45",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {influencerMetrics?.avgLikes
                  ? (influencerMetrics.avgLikes / 1000).toFixed(0) + "K"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Avg Likes
              </div>
            </div>
          </Card>
        </Col>

        {/* Average Comments */}
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
                  color: "#9254de",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  color: "#9254de",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {influencerMetrics?.avgComments
                  ? (influencerMetrics.avgComments / 1000).toFixed(1) + "K"
                  : "0"}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Avg Comments
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📊 Row 3 – Dual Radar Charts */}
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }} align="stretch">
        {/* Left: Performance Analysis Radar Chart (1/2 width) */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ fontSize: "18px", fontWeight: 600, color: "#333" }}>
                Influencer Performance Analysis
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "476px",
            }}
            bodyStyle={{ padding: "24px", height: "calc(100% - 57px)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Radar {...radarConfig} />
            </div>
          </Card>
        </Col>

        {/* Right: Category Performance Radar Chart (1/2 width) */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ fontSize: "18px", fontWeight: 600, color: "#333" }}>
                Category Performance Analysis
              </div>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f2f7",
              height: "476px",
            }}
            bodyStyle={{ padding: "24px", height: "calc(100% - 57px)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Radar {...categoryRadarConfig} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InfluencerIntelligenceUI;
