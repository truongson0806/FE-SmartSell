import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng");
  };

  const addWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some(item => item.id === product.id);
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Đã thêm vào wishlist");
    } else {
      alert("Sản phẩm đã có trong wishlist");
    }
  };

  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />
      </Link>
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h3>{product.name}</h3>
      </Link>
      <p style={styles.price}>{product.price}</p>
      <button
        style={styles.btn}
        onClick={addToCart}
      >
        Add to Cart
      </button>
      <button
        style={styles.btn2}
        onClick={addWishlist}
      >
        Wishlist
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "200px",
    textAlign: "center",
    borderRadius: "10px"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },
  price: {
    color: "red",
    fontWeight: "bold"
  },
  btn: {
    margin: "5px",
    padding: "8px",
    background: "#ff6600",
    color: "white",
    border: "none"
  },
  btn2: {
    margin: "5px",
    padding: "8px",
    background: "gray",
    color: "white",
    border: "none"
  }
};

export default ProductCard;