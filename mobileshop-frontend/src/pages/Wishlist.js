import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <div style={styles.container}>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Chưa có sản phẩm yêu thích</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} style={styles.item}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.info}>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)}>Xóa</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  item: { display: "flex", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  image: { width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" },
  info: { flex: 1 }
};

export default Wishlist;