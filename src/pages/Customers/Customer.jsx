import { useState } from "react";

function Customer() {
  const [tab, setTab] = useState("login");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào bạn muốn mua điện thoại gì?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const newMessages = [
      ...messages,
      { from: "user", text: input },
      {
        from: "bot",
        text: "  iPhone 15, Samsung S24, Xiaomi 13 Pro, Oppo Find X6 Pro, Vivo X90 Pro, Realme GT 3 Pro, OnePlus 11T Pro, Asus ROG Phone 7 Pro, Google Pixel 8 Pro, Sony Xperia 1 IV"
      }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      {/* 🌟 HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Customer System
      </h1>

      {/* 🔥 TAB */}
      <div className="flex gap-3 mb-6">
        {["login", "register", "chat", "review"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium transition 
              ${tab === t
                ? "bg-blue-600 text-white shadow"
                : "bg-white border hover:bg-gray-200"}`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/*  LOGIN */}
      {tab === "login" && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
          <input className="w-full border p-2 mb-3 rounded" placeholder="Email" />
          <input className="w-full border p-2 mb-3 rounded" placeholder="Password" type="password" />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>
      )}

      {/*  REGISTER */}
      {tab === "register" && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Đăng ký</h2>
          <input className="w-full border p-2 mb-3 rounded" placeholder="Name" />
          <input className="w-full border p-2 mb-3 rounded" placeholder="Email" />
          <input className="w-full border p-2 mb-3 rounded" placeholder="Password" type="password" />
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Register
          </button>
        </div>
      )}

      {/*  CHATBOT */}
      {tab === "chat" && (
        <div className="w-full max-w-md bg-white p-4 rounded-xl shadow flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Chatbot tư vấn</h2>

          <div className="flex-1 h-64 overflow-y-auto border rounded p-2 mb-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 rounded-lg text-sm 
                    ${msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"}`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..." />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700"
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* ⭐ REVIEW */}
      {tab === "review" && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Review sản phẩm</h2>

          <textarea
            className="w-full border p-2 rounded mb-3"
            placeholder="Nhập review..." />

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 mb-4">
            Gửi review
          </button>

          <div className="space-y-2">
            <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
              ⭐️⭐️⭐️⭐️⭐️ Sản phẩm rất tốt!
            </div>
            <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
              ⭐️⭐️⭐️ Ok nhưng giá hơi cao
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Customer;