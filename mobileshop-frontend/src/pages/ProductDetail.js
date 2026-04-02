import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  // Lấy đánh giá từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`reviews_${id}`) || "[]");
    setReviews(saved);
  }, [id]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setMsg("Vui lòng đăng nhập để đánh giá");
      return;
    }
    if (!comment.trim()) {
      setMsg("Vui lòng nhập nội dung đánh giá");
      return;
    }
    const newReview = {
      id: Date.now(),
      user: currentUser.name,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleString(),
    };
    const updated = [newReview, ...reviews];
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setReviews(updated);
    setComment("");
    setRating(5);
    setMsg("Đã thêm đánh giá thành công");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.productInfo}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h1>{product.name}</h1>
          <p style={styles.price}>{product.price}</p>
          <p style={styles.desc}>
            Đây là mô tả sản phẩm. Bạn có thể thêm thông tin chi tiết ở đây.
          </p>
        </div>
      </div>

      <div style={styles.reviewSection}>
        <h2>Đánh giá sản phẩm</h2>

        {/* Form thêm đánh giá */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.ratingGroup}>
            <label>Chất lượng: </label>
            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} sao</option>
              ))}
            </select>
          </div>
          <textarea
            rows="3"
            placeholder="Nhận xét của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Gửi đánh giá</button>
          {msg && <p style={{ color: msg.includes("thành công") ? "green" : "red" }}>{msg}</p>}
        </form>

        {/* Danh sách đánh giá */}
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào. Hãy là người đầu tiên nhận xét!</p>
        ) : (
          <div style={styles.reviewsList}>
            {reviews.map(rev => (
              <div key={rev.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <strong>{rev.user}</strong>
                  <span style={styles.ratingBadge}>{"⭐".repeat(rev.rating)} ({rev.rating} sao)</span>
                  <small>{rev.date}</small>
                </div>
                <p style={styles.reviewComment}>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  productInfo: {
    display: "flex",
    gap: "30px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  info: {
    flex: 1,
  },
  price: {
    fontSize: "24px",
    color: "red",
    fontWeight: "bold",
    margin: "10px 0",
  },
  desc: {
    lineHeight: "1.6",
  },
  reviewSection: {
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  form: {
    marginBottom: "30px",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
  },
  ratingGroup: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  button: {
    background: "#ff6600",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  reviewsList: {
    marginTop: "20px",
  },
  reviewCard: {
    borderBottom: "1px solid #eee",
    padding: "15px 0",
  },
  reviewHeader: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  ratingBadge: {
    background: "#ffc107",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  reviewComment: {
    margin: 0,
    color: "#555",
  },
};

export default ProductDetail;