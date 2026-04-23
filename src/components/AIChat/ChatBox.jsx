import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import ProductCard from "./ProductCard";
import QuickReply from "./QuickReply";

// ─────────────────────────────────────────────
//  TODO: Truyền dữ liệu tin nhắn thật từ database / API vào đây
// ─────────────────────────────────────────────

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Thay tin nhắn xin chào bằng dữ liệu thật từ database / API nếu cần
  const [messages] = useState([
    {
      type: "ai",
      text: "Xin chào! Tôi là SmartSell AI 🤖\nTôi có thể giúp bạn tư vấn điện thoại, so sánh sản phẩm và tìm deal tốt nhất!",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping] = useState(false); // TODO: kết nối với trạng thái gọi API thật

  const messagesEndRef = useRef(null);

  // Tự scroll xuống cuối mỗi khi messages thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // TODO: Thay hàm này bằng logic gửi tin nhắn thật (gọi API / database)
  const handleSend = (text) => {
    if (!text.trim()) return;
    setInputValue("");
    // Phần xử lý gửi tin nhắn sẽ được thêm sau
  };

  return (
    <>
      {/* ── Nút mở / đóng chat (floating) ── */}
      <button
        id="ai-chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #059669, #10b981)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(5, 150, 105, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          zIndex: 1000,
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isOpen ? "scale(0.9) rotate(20deg)" : "scale(1)",
        }}
        title="Mở trợ lý AI"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* ── Vòng ping xung quanh nút (ẩn khi chat đang mở) ── */}
      {!isOpen && (
        <span
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.3)",
            zIndex: 999,
            animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
      )}

      {/* ── Cửa sổ chat ── */}
      {isOpen && (
        <div
          id="ai-chatbox-window"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "370px",
            height: "560px",
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(5,150,105,0.12)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden",
            animation: "slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
            border: "1px solid rgba(5,150,105,0.15)",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              background: "linear-gradient(135deg, #065f46, #059669)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            {/* Avatar AI */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              🤖
            </div>

            {/* Tên + trạng thái */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "15px",
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "-0.3px",
                }}
              >
                SmartSell AI
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#86efac",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span style={{ color: "#a7f3d0", fontSize: "12px" }}>
                  Đang hoạt động
                </span>
              </div>
            </div>

            {/* Nút đóng */}
            <button
              id="ai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
            >
              ✕
            </button>
          </div>

          {/* ── Khu vực tin nhắn ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#f8fafc",
              scrollbarWidth: "thin",
              scrollbarColor: "#d1fae5 transparent",
            }}
          >
            {/* TODO: Thay messages bằng dữ liệu từ database / API */}
            {messages.map((msg, index) => (
              <div key={index}>
                <Message msg={msg} />
                {msg.products &&
                  msg.products.map((p, i) => (
                    <ProductCard key={i} product={p} />
                  ))}
              </div>
            ))}

            {/* Typing indicator — hiện khi AI đang trả lời */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "12px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#059669",
                        display: "inline-block",
                        animation: `bounce 1.2s ease infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Reply chips ── */}
          {/* TODO: truyền dữ liệu gợi ý từ API vào QuickReply nếu cần */}
          <QuickReply onSend={handleSend} />

          {/* ── Input gửi tin nhắn ── */}
          <div
            style={{
              padding: "12px 16px",
              background: "#ffffff",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              id="ai-chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  handleSend(inputValue.trim());
                }
              }}
              placeholder="Nhập tin nhắn..."
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "24px",
                border: "1.5px solid #d1fae5",
                outline: "none",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                background: "#f0fdf4",
                color: "#1e293b",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#059669";
                e.target.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1fae5";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              id="ai-chat-send-btn"
              onClick={() => handleSend(inputValue.trim())}
              disabled={!inputValue.trim()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #059669, #10b981)"
                  : "#e2e8f0",
                border: "none",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
                transition: "all 0.2s",
                boxShadow: inputValue.trim()
                  ? "0 4px 12px rgba(5,150,105,0.3)"
                  : "none",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        #ai-chatbox-window ::-webkit-scrollbar { width: 4px; }
        #ai-chatbox-window ::-webkit-scrollbar-track { background: transparent; }
        #ai-chatbox-window ::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 4px; }
      `}</style>
    </>
  );
};

export default ChatBox;
