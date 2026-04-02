import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!name || !email || !password || !confirm) {
      setMsg("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirm) {
      setMsg("Mật khẩu xác nhận không khớp");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email === email)) {
      setMsg("Email đã được sử dụng");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMsg("Đăng ký thành công");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div style={styles.container}>
      <h2>Đăng ký</h2>
      <input placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="Xác nhận mật khẩu" value={confirm} onChange={e => setConfirm(e.target.value)} />
      <button onClick={register}>Đăng ký</button>
      <p style={{ color: msg.includes("thành công") ? "green" : "red" }}>{msg}</p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px" }
};

export default Register;