import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, clearCart } = useCart();

  // Quản lý thông tin khách hàng nhập vào form
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ isVisible: true, message, type });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };

  const handleCheckout = async () => {
    console.log("1. Đã bấm nút đặt hàng thành công!");
    setNotification(prev => ({ ...prev, isVisible: false }));

    if (cart.length === 0) {
      showNotification("Giỏ hàng trống!", "error");
      return;
    }

    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      showNotification("Vui lòng điền đầy đủ thông tin giao hàng!", "error");
      return;
    }

    // TỰ ĐỘNG 100%: Khách đặt món nào lấy đúng ID món đó
    const formattedItems = cart.map(item => {
      const currentId = item.id || item.productId || item.product_id;

      return {
        id: currentId ? Number(currentId) : null,
        productId: currentId ? Number(currentId) : null,
        name: String(item.name || "Sản phẩm"),
        image: String(item.image || ""),
        quantity: Number(item.quantity || item.qty || 1),
        price: String(item.price || "0")
      };
    });

    // Gom dữ liệu payload gửi lên Spring Boot
    const orderData = {
      userId: 1,
      totalAmount: String(cartTotal),
      fullName: shippingInfo.fullName,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      items: formattedItems
    };

    try {
      console.log("2. Payload gửi lên Spring Boot sạch sẽ không lo lỗi ngoại:", orderData);

      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      console.log("3. Kết quả phản hồi từ Server:", result);

      if (result.error || response.status >= 400) {
        throw new Error(result.message || "Lỗi lưu đơn hàng phía Server");
      }

      // Hiện thông báo thành công lên màn hình
      showNotification(`Chúc mừng ${shippingInfo.fullName} đã đặt hàng thành công!`, "success");

      setTimeout(() => {
        clearCart();
        navigate('/history');
      }, 2000);

    } catch (error) {
      console.error("Lỗi khi kết nối API:", error);
      showNotification(error.message || "Đã có lỗi xảy ra trong quá trình thanh toán", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Form thông tin giao nhận hàng */}
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
          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl mt-4 shadow-lg shadow-green-600/20 transition-colors cursor-pointer"
          >
            XÁC NHẬN ĐẶT HÀNG
          </button>
        </div>

        {/* Đơn hàng hiển thị */}
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
                  <div key={item.id || Math.random()} className="flex items-center gap-4 p-4 border rounded-2xl bg-gray-50/50">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white rounded-xl p-1 border" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Số lượng: {item.quantity || item.qty || 1}</p>
                      <p className="font-black text-green-600 mt-2 text-sm">
                        {(Number(item.price || 0) * (item.quantity || item.qty || 1)).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tổng kết số tiền hóa đơn */}
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Tổng thanh toán</span>
              <span className="text-2xl font-black text-green-600">
                {cartTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>

            {/* Hiển thị thông báo động */}
            {notification.isVisible && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${notification.type === 'success'
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