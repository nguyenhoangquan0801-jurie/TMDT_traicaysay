import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  // Tự quản lý trạng thái đóng mở bằng Event như code gốc của bạn
  const [isOpen, setIsOpen] = useState(false);

  // Gọi trực tiếp dữ liệu và các hàm tăng giảm chuẩn từ Context ra dùng
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCart();

  // Lắng nghe sự kiện để tự động mở Giỏ hàng lên khi bấm ở Navbar hoặc nút Mua
  useEffect(() => {
    const handleOpenCart = () => setIsOpen(true);
    
    window.addEventListener('openCartGlobal', handleOpenCart);
    // Đồng bộ real-time giữa các tab/trang nếu cần
    window.addEventListener('storage', () => {}); 

    return () => {
      window.removeEventListener('openCartGlobal', handleOpenCart);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Nền đen mờ phía sau - Bấm vào tự đóng */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          
          {/* Header giỏ hàng */}
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Giỏ hàng <span className="text-gray-500 font-normal text-sm">({cartCount} sản phẩm)</span>
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-12">Giỏ hàng trống</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl bg-white relative">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-400">{Number(item.price).toLocaleString('vi-VN')}đ</p>
                    
                    {/* Cụm tăng giảm số lượng - Ăn khớp 100% với hệ thống */}
                    <div className="flex items-center border rounded-full w-24 h-8 mt-2 justify-between px-2 bg-gray-50">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-500 hover:text-black font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="text-gray-500 hover:text-black font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Giá tổng của sản phẩm này */}
                  <div className="text-right flex flex-col justify-between h-16">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 text-sm">✕</button>
                    <span className="font-bold text-green-600 text-sm">
                      {(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Phần tính tiền */}
          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span className="font-semibold">{cartTotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold text-gray-800">Tổng tiền:</span>
                <span className="text-xl font-black text-green-600">{cartTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;