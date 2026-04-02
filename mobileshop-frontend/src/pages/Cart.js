import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  };

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        if (newQty <= 0) return null;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const removeItem = (id) => {
    const filtered = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(filtered));
    setCart(filtered);
  };

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9]/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div style={styles.container}>
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.info}>
                <h4>{item.name}</h4>
                <p>{item.price}</p>
                <div>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => removeItem(item.id)} style={styles.remove}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
          <h3>Tổng tiền: {total.toLocaleString()}đ</h3>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  item: { display: "flex", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  image: { width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" },
  info: { flex: 1 },
  remove: { marginLeft: "10px", background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }
};

export default Cart;