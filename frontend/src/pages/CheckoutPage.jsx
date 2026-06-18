import React from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  // Gọi các giá trị tính toán đồng bộ trực tiếp từ CartContext ra dùng
  const { cart, cartCount, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Khối bên trái: Form thông tin giao nhận hàng */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Thanh toán đơn hàng</h2>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Họ và tên</label>
            <input type="text" placeholder="Nhập họ tên..." className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại..." className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Địa chỉ giao hàng</label>
            <textarea placeholder="Nhập địa chỉ nhận hàng chi tiết..." className="w-full p-3 border rounded-xl bg-gray-50 h-24" />
          </div>
          <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl mt-4 shadow-lg shadow-green-600/20 transition-colors cursor-pointer">
            XÁC NHẬN ĐẶT HÀNG
          </button>
        </div>

        {/* Khối bên phải: Đơn hàng hiển thị (Đã sửa thuật toán nhân số lượng) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between h-fit space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800 border-b pb-3">
              <span>🛒</span>
              <h2>Đơn hàng của bạn</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">{cartCount} sản phẩm trong giỏ hàng</p>

            <div className="mt-6 space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-6">Chưa có sản phẩm nào</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl bg-gray-50/50">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white rounded-xl p-1 border" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Số lượng: {item.quantity}</p>
                      
                      {/* CHỮA LỖI ĐỘC QUYỀN: Lấy đơn giá nhân chính xác với số lượng người chọn */}
                      <p className="font-black text-green-600 mt-2 text-sm">
                        {(Number(item.price || 0) * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Khối tổng kết số tiền hóa đơn cuối cùng */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Tổng thanh toán</span>
              {/* Giá trị tổng tiền chuẩn động theo thời gian thực */}
              <span className="text-2xl font-black text-green-600">
                {cartTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-xs text-gray-400">Đã bao gồm toàn bộ chi phí vận chuyển</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;