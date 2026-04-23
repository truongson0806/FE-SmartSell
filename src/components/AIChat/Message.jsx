import React from "react";

const Message = ({ msg }) => {
  const isUser = msg.type === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        gap: "8px",
      }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #059669, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
          }}
        >
          🤖
        </div>
      )}

      <div
        style={{
          maxWidth: "72%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          fontSize: "13.5px",
          lineHeight: "1.55",
          fontFamily: "Arial, sans-serif",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          background: isUser
            ? "linear-gradient(135deg, #059669, #10b981)"
            : "#ffffff",
          color: isUser ? "#ffffff" : "#1e293b",
          boxShadow: isUser
            ? "0 4px 12px rgba(5,150,105,0.3)"
            : "0 2px 8px rgba(0,0,0,0.07)",
          border: isUser ? "none" : "1px solid #e2e8f0",
        }}
      >
        {msg.text}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e11d48, #f43f5e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(225,29,72,0.3)",
          }}
        >
          👤
        </div>
      )}
    </div>
  );
};

export default Message;
