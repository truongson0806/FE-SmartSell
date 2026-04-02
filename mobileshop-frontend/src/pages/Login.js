import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!email || !password) {
      setMsg("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setMsg("Email hoặc mật khẩu không đúng");
      return;
    }

    // Lưu trạng thái đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));
    setMsg("Đăng nhập thành công");
    navigate("/"); // chuyển về trang chủ
  };

  return (
    <div style={styles.container}>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Đăng nhập</button>
      <p style={{ color: msg.includes("thành công") ? "green" : "red" }}>{msg}</p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px" }
};

export default Login;