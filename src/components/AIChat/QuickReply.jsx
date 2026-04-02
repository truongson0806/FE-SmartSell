import React from "react";

const QuickReply = ({ onSend }) => {
  const options = [
    "📱 Tư vấn điện thoại",
    "💰 Dưới 10 triệu",
    "🎮 Chơi game",
    "📸 Chụp ảnh đẹp"
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 border-t">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSend(opt)}
          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
