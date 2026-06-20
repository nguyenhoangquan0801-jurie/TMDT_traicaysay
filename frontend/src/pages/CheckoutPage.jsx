import React, { useState } from 'react'; // Bổ sung useState để lưu thông tin nhập
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  // Gọi các giá trị tính toán đồng bộ trực tiếp từ CartContext ra dùng
  const { cart, cartCount, cartTotal } = useCart();

  // Bổ sung State để quản lý thông tin khách hàng nhập vào form
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  // --- STATE QUẢN LÝ THÔNG BÁO TẠI VÙNG KHOANH ĐỎ ---
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success' // 'success' hoặc 'error'
  });

  // Hàm tiện ích để hiển thị thông báo dưới đơn hàng
  const showNotification = (message, type = 'success') => {
    setNotification({ isVisible: true, message, type });
  };

  // Hàm cập nhật dữ liệu khi người dùng gõ vào các ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };

  // Hàm xử lý logic khi bấm nút XÁC NHẬN ĐẠT HÀNG
  const handleCheckout = () => {
    // 1. Kiểm tra giỏ hàng trống
    if (cart.length === 0) {
      showNotification("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!", "error");
      return;
    }

    // 2. Kiểm tra xem người dùng đã điền đầy đủ thông tin chưa
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      showNotification("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!", "error");
      return;
    }

    // 3. Gom dữ liệu để chuẩn bị gửi lên Backend (Java Spring Boot của bạn)
    const orderData = {
      customer: shippingInfo,
      items: cart,
      totalAmount: cartTotal,
      orderDate: new Date()
    };

    console.log("Dữ liệu đơn hàng sẵn sàng gửi API:", orderData);
    
    // Hiển thị thông báo đặt hàng thành công tại vùng khoanh đỏ
    showNotification(`Chúc mừng ${shippingInfo.fullName} đã đặt hàng thành công!`, "success");
    
    // TODO: Sau này bạn gọi axios.post('/api/orders', orderData) ở đây để lưu vào database nhé.
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Khối bên trái: Form thông tin giao nhận hàng */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Thanh toán đơn hàng</h2>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Họ và tên</label>
            <input 
              type="text" 
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              placeholder="Nhập họ tên..." 
              className="w-full p-3 border rounded-xl bg-gray-50" 
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Số điện thoại</label>
            <input 
              type="text" 
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại..." 
              className="w-full p-3 border rounded-xl bg-gray-50" 
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Địa chỉ giao hàng</label>
            <textarea 
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ nhận hàng chi tiết..." 
              className="w-full p-3 border rounded-xl bg-gray-50 h-24" 
            />
          </div>
          {/* Gắn sự kiện onClick vào button để kích hoạt hàm xử lý */}
          <button 
            onClick={handleCheckout}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl mt-4 shadow-lg shadow-green-600/20 transition-colors cursor-pointer"
          >
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

          {/* Khối tổng kết số tiền hóa đơn cuối cùng và vùng thông báo khoanh đỏ */}
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Tổng thanh toán</span>
              {/* Giá trị tổng tiền chuẩn động theo thời gian thực */}
              <span className="text-2xl font-black text-green-600">
                {cartTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
            {/* <p className="text-xs text-gray-400">Đã bao gồm toàn bộ chi phí vận chuyển</p> */}

            {/* --- VÙNG HIỂN THỊ THÔNG BÁO THEO KHU VỰC ĐƯỢC KHOANH ĐỎ --- */}
            {notification.isVisible && (
              <div 
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                  notification.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <span className="text-lg mt-0.5">
                  {notification.type === 'success' ? '✅' : '⚠️'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {notification.type === 'success' ? 'Thành công!' : 'Lưu ý:'}
                  </p>
                  <p className="text-xs mt-0.5 opacity-90 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
                <button 
                  onClick={() => setNotification({ ...notification, isVisible: false })}
                  className="text-xs font-bold hover:opacity-70 cursor-pointer px-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;