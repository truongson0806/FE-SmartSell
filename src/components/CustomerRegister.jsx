import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.type === "text" ? "name" : e.target.type]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check trùng email
    const exists = users.find(u => u.email === form.email);
    if (exists) {
      alert("Email đã tồn tại!");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-emerald-600 mb-6">Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Họ tên" className="w-full border rounded-lg p-2 mb-3" onChange={handleChange}/>
          <input type="email" placeholder="Email" className="w-full border rounded-lg p-2 mb-3" onChange={handleChange}/>
          <input type="password" placeholder="Mật khẩu" className="w-full border rounded-lg p-2 mb-3" onChange={handleChange}/>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg">Đăng ký</button>
        </form>
      </div>
    </div>
  );
}