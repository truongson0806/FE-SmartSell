import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div>
      <h2>Giỏ hàng</h2>

      {cart.map(item => (
        <div key={item._id}>
          <h4>{item.name}</h4>
          <p>{item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item._id, Number(e.target.value))
            }
          />

          <button onClick={() => removeFromCart(item._id)}>
            Xóa
          </button>
        </div>
      ))}

      <h3>Tổng: {totalPrice}</h3>
    </div>
  );
};

export default Cart;