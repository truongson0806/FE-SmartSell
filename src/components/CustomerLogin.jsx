import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CustomerLogin() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.type]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );

    if (!user) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    // lưu session
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast.success("Đăng nhập thành công!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-emerald-600 mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="w-full border rounded-lg p-2 mb-3" onChange={handleChange}/>
          <input type="password" placeholder="Mật khẩu" className="w-full border rounded-lg p-2 mb-3" onChange={handleChange}/>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg">Đăng nhập</button>
        </form>
        <div className="mt-4 text-center text-sm">
          Chưa có tài khoản? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}