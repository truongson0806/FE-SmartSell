
import React, { useState } from "react";
import Message from "./Message";
import ProductCard from "./ProductCard";
import QuickReply from "./QuickReply";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Xin chào! Tôi là SmartSell AI 🤖. Bạn cần tư vấn gì?" }
  ]);

  const handleSend = (text) => {
    const newMessages = [...messages, { type: "user", text }];

    let aiResponse = {
      type: "ai",
      text: "Bạn muốn tìm điện thoại theo mức giá nào?"
    };

    if (text.toLowerCase().includes("10")) {
      aiResponse = {
        type: "ai",
        text: "Đây là một số sản phẩm phù hợp:",
        products: [
          {
            name: "iPhone 11",
            price: "9.990.000đ",
            image: "https://via.placeholder.com/100"
          },
          {
            name: "Samsung S21",
            price: "8.990.000đ",
            image: "https://via.placeholder.com/100"
          }
        ]
      };
    }

    setMessages([...newMessages, aiResponse]);
  };

  return (
    <div className="fixed bottom-5 right-5 w-[350px] h-[500px] bg-white border rounded-xl flex flex-col shadow-xl z-50">
      
      {/* Header */}
      <div className="p-3 bg-blue-500 text-white font-bold rounded-t-xl">
        🤖 SmartSell AI
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, index) => (
          <div key={index}>
            <Message msg={msg} />
            {msg.products &&
              msg.products.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
          </div>
        ))}
      </div>

      {/* Quick reply */}
      <QuickReply onSend={handleSend} />

      {/* Input */}
      <div className="flex border-t">
        <input
          className="flex-1 p-2 outline-none"
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              handleSend(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
