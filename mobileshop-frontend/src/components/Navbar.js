import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = localStorage.getItem("currentUser");
    if (current) setUser(JSON.parse(current));
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2>MobileShop</h2>
      <div>
        <Link to="/" style={styles.link}>Trang chủ</Link>
        <Link to="/cart" style={styles.link}>Giỏ hàng</Link>
        <Link to="/wishlist" style={styles.link}>Yêu thích</Link>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Đăng nhập</Link>
            <Link to="/register" style={styles.link}>Đăng ký</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Xin chào, {user.name}</span>
            <button onClick={logout} style={styles.logoutBtn}>Đăng xuất</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#ff6600",
    color: "white",
    alignItems: "center"
  },
  link: {
    margin: "0 10px",
    color: "white",
    textDecoration: "none"
  },
  user: {
    margin: "0 10px"
  },
  logoutBtn: {
    background: "white",
    color: "#ff6600",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

export default Navbar;