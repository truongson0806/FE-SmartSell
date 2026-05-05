import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleCheckout = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      toast.error('Bạn cần đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      toast.error('Giỏ hàng trống!');
      return;
    }
    
    // Giả lập thanh toán thành công
    toast.success('Thanh toán thành công! Đơn hàng đang được xử lý.');
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // Giá sản phẩm có dạng "1.490.000đ" -> chuyển thành số
      const priceStr = item.price.replace(/\./g, '').replace('đ', '');
      return total + parseInt(priceStr, 10);
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-emerald-700">Giỏ hàng của bạn</h1>
          <Link to="/" className="text-emerald-600 hover:underline">← Tiếp tục mua sắm</Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <div className="text-5xl mb-4">🛒</div>
            <p>Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-emerald-600 font-bold">{item.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition"
                >
                  Xóa
                </button>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-6 mt-6 border-t-2">
              <span className="text-xl font-bold">Tổng cộng:</span>
              <span className="text-2xl font-black text-rose-600">{formatPrice(calculateTotal())}</span>
            </div>

            <div className="mt-8">
              <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
