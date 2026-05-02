import React from "react";

const options = [
  { emoji: "📱", label: "Tư vấn điện thoại" },
  { emoji: "💰", label: "Dưới 10 triệu" },
  { emoji: "🎮", label: "Chơi game" },
  { emoji: "📸", label: "Chụp ảnh đẹp" },
];

const QuickReply = ({ onSend }) => {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderTop: "1px solid #e2e8f0",
        background: "#ffffff",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        flexShrink: 0,
      }}
    >
      <p
        style={{
          width: "100%",
          fontSize: "11px",
          color: "#94a3b8",
          fontFamily: "Arial, sans-serif",
          marginBottom: "2px",
          fontWeight: 500,
        }}
      >
        Gợi ý nhanh:
      </p>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSend(`${opt.emoji} ${opt.label}`)}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            border: "1.5px solid #d1fae5",
            background: "#f0fdf4",
            color: "#065f46",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "Arial, sans-serif",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#059669";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "#059669";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(5,150,105,0.25)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f0fdf4";
            e.currentTarget.style.color = "#065f46";
            e.currentTarget.style.borderColor = "#d1fae5";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>{opt.emoji}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
