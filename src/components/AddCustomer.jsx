import { useState } from "react";
import { createCustomer } from "../../../network/customerApi";

export default function AddCustomer({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    try {
      await createCustomer({ name, email });
      alert("Thêm thành công");

      setName("");
      setEmail("");

      // reload list
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err);
      alert("Lỗi thêm khách hàng");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>➕ Thêm khách hàng</h3>

      <input
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button onClick={handleSubmit}>Thêm</button>
    </div>
  );
} 