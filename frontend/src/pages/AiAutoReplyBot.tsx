import { Typography, Card, Button, Space, Divider } from "antd";
import { CheckOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

interface CommentReply {
  id: number;
  comment: string;
  videoThumbnail: string;
  videoTitle: string;
  draftReply: string;
  username: string;
  platform: string;
}

const AiAutoReplyBot = () => {
  const [replies, setReplies] = useState<CommentReply[]>([
    {
      id: 1,
      comment: "Is it good for wavy curly hair?",
      videoThumbnail: "/src/assets/tiktok/tiktok1.png",
      videoTitle:
        "Set your hair free from dehydration once and for all.  Introducing the ultimate routine for dry and dehydrated...",
      draftReply:
        "If you have dryness and frizzy hair it will be suitable for you 😉",
      username: "@📚 lin.",
      platform: "TikTok",
    },
    {
      id: 2,
      comment:
        "Kalau untuk kulit muka kusam,kering,Bintik hitam,pakai set creme yg mana sis",
      videoThumbnail: "/src/assets/tiktok/tiktok2.png",
      videoTitle:
        "‘I used to have wrinkles and no matter what I used it will never go away until I started using this.” If it’s time for your...",
      draftReply:
        "Hi sis 🌸 Sesuai untuk bantu cerahkan kulit kusam, lembapkan secara mendalam & kurangkan bintik hitam ✨ Konsisten je, hasil akan nampak lebih glowing 🤍",
      username: "@Anisa",
      platform: "TikTok",
    },
    {
      id: 3,
      comment: "what about oily hair+ flat+ thin hair?",
      videoThumbnail: "/src/assets/tiktok/tiktok3.png",
      videoTitle:
        "Flat to bouncy hair? Bet! Try our NEW Hyaluron Moisture for bouncy hair, that's full of life. #LorealParisMY...",
      draftReply:
        "I feel you, oily + flat hair can be so annoying… this one keeps it fresh, light & bouncy without weighing it down 💙✨",
      username: "@Portatayy __",
      platform: "TikTok",
    },
    {
      id: 4,
      comment: "kat Watson ada jual tak?",
      videoThumbnail: "/src/assets/tiktok/tiktok4.png",
      videoTitle:
        "Come back stronger with fuller hair in 42 days. NEW Full Resist Anti Hair Fall range. #RescuedByFullResist #LorealParisMY",
      draftReply: "ada sis.. Guardian juga",
      username: "@Afreena_Allysha🌷",
      platform: "TikTok",
    },
  ]);

  const handleAction = (id: number, action: "approve" | "edit" | "reject") => {
    console.log(`${action} reply for comment ${id}`);
    // Here you would typically make an API call to handle the action
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ color: "#5A67BA", marginBottom: 8 }}>
          Smart Replies
        </Title>
        <Text style={{ color: "rgba(166, 171, 200, 1)", fontSize: 16 }}>
          Review and manage AI-generated replies to TikTok comments
        </Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {replies.map((reply) => (
          <Card
            key={reply.id}
            style={{
              backgroundColor: "#F8F9FB",
              border: "1px solid #E8EAED",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              {/* Video Thumbnail */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={reply.videoThumbnail}
                  alt="Video thumbnail"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    objectFit: "cover",
                    border: "2px solid #E8EAED",
                  }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Video Title */}
                <Text
                  strong
                  style={{ color: "#5A67BA", fontSize: 14, lineHeight: 1.4 }}
                >
                  {reply.videoTitle}
                </Text>

                <Divider style={{ margin: "8px 0", borderColor: "#E8EAED" }} />

                {/* Comment */}
                <div>
                  <Text
                    style={{
                      color: "rgba(166, 171, 200, 1)",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    COMMENT FROM {reply.username}:
                  </Text>
                  <div
                    style={{
                      backgroundColor: "#F1F2F7",
                      padding: "12px",
                      borderRadius: 8,
                      marginTop: 4,
                      border: "1px solid rgba(166, 171, 200, 0.2)",
                    }}
                  >
                    <Text style={{ color: "#333", fontSize: 18 }}>
                      "{reply.comment}"
                    </Text>
                  </div>
                </div>

                {/* Generated Reply */}
                <div>
                  <Text
                    style={{
                      color: "rgba(166, 171, 200, 1)",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    GENERATED REPLY (DRAFT):
                  </Text>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "12px",
                      borderRadius: 8,
                      marginTop: 4,
                      border: "1px solid #5A67BA",
                    }}
                  >
                    <Text style={{ color: "#333", fontSize: 18 }}>
                      {reply.draftReply}
                    </Text>
                  </div>
                </div>

                {/* Action Buttons */}
                <Space size="middle" style={{ marginTop: 8 }}>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => handleAction(reply.id, "approve")}
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleAction(reply.id, "edit")}
                    style={{
                      backgroundColor: "#5A67BA",
                      borderColor: "#5A67BA",
                      color: "white",
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => handleAction(reply.id, "reject")}
                    style={{
                      borderRadius: 6,
                      fontWeight: 500,
                    }}
                  >
                    Reject
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div style={{ marginTop: 32 }}>
        <Card
          style={{
            backgroundColor: "#F1F2F7",
            border: "1px solid #E8EAED",
            borderRadius: 12,
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <Text strong style={{ color: "#5A67BA", fontSize: 14 }}>
            Summary:
          </Text>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: "rgba(166, 171, 200, 1)" }}>
              Total Pending:{" "}
              <strong style={{ color: "#5A67BA" }}>{replies.length}</strong>
            </Text>
            <Text style={{ color: "rgba(166, 171, 200, 1)" }}>
              Approved Today: <strong style={{ color: "#52c41a" }}>12</strong>
            </Text>
            <Text style={{ color: "rgba(166, 171, 200, 1)" }}>
              Rejected Today: <strong style={{ color: "#ff4d4f" }}>3</strong>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AiAutoReplyBot;
