import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div style={styles.container}>

      <h1>Danh sách sản phẩm</h1>

      <div style={styles.grid}>

        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}

      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },

  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  }
};

export default Home;