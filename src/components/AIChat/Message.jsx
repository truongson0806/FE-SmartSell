import React from "react";

const Message = ({ msg }) => {
  return (
    <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded-xl max-w-[70%] text-sm ${
          msg.type === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Message;
