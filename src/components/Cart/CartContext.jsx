import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // thêm sản phẩm
  const addToCart = (product) => {
    const exist = cart.find(item => item._id === product._id);

    if (exist) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // xóa
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // cập nhật số lượng
  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, quantity } : item
    ));
  };

  // tổng tiền
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};