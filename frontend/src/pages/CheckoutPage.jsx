import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, clearCart } = useCart();

  // ==========================================
  // PHẦN THÊM MỚI: State quản lý Voucher
  // ==========================================
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Quản lý thông tin khách hàng 
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

  // ==========================================
  // PHẦN THÊM MỚI: Hàm gọi API kiểm tra Voucher
  // ==========================================
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      showNotification("Vui lòng nhập mã voucher!", "error");
      return;
    }

    try {
      // Gọi API Spring Boot để check mã
      const response = await fetch(`http://localhost:8080/api/vouchers/check?code=${voucherCode.trim()}`);

      if (!response.ok) {
        throw new Error("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
      }

      const voucherData = await response.json();
      setAppliedVoucher(voucherData);
      showNotification(`Áp dụng mã ${voucherData.code} thành công!`, "success");
    } catch (error) {
      console.error("Lỗi áp dụng voucher:", error);
      showNotification(error.message || "Không thể áp dụng mã này!", "error");
      setAppliedVoucher(null);
    }
  };

  // ==========================================
  // PHẦN THÊM MỚI: Hàm tính số tiền được giảm
  // ==========================================
  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.discountType === 'PERCENT') {
      return (cartTotal * Number(appliedVoucher.discountValue)) / 100;
    } else {
      return Number(appliedVoucher.discountValue);
    }
  };

  const discountAmount = calculateDiscount();
  // Tổng tiền cuối cùng sau khi trừ giảm giá
  const finalTotal = Math.max(0, cartTotal - discountAmount);

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

    const orderData = {
      userId: 1,
      totalAmount: String(finalTotal),
      voucherCode: appliedVoucher ? appliedVoucher.code : null,

      discountAmount: String(discountAmount),
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

      // Hiện thông báo thành công 
      showNotification(`Chúc mừng ${shippingInfo.fullName} đã đặt hàng thành công!`, "success");

      setTimeout(() => {
        clearCart();       

        navigate('/history', { replace: true });
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

            <div className="mt-6 space-y-4 max-h-[250px] overflow-y-auto pr-2">
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

          {/* ========================================== */}
          {/* PHẦN THÊM MỚI: Giao diện ô nhập mã Voucher */}
          {/* ========================================== */}
          <div className="border-t pt-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Mã giảm giá (Voucher)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Nhập mã khuyến mãi..."
                disabled={!!appliedVoucher}
                className="flex-1 p-2.5 border rounded-xl bg-gray-50 text-sm uppercase font-bold tracking-wider"
              />
              {appliedVoucher ? (
                <button
                  onClick={() => { setAppliedVoucher(null); setVoucherCode(''); }}
                  className="px-4 py-2.5 bg-red-100 text-red-600 font-bold rounded-xl text-sm hover:bg-red-200 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
              ) : (
                <button
                  onClick={handleApplyVoucher}
                  className="px-4 py-2.5 bg-gray-800 text-white font-bold rounded-xl text-sm hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              )}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Tạm tính</span>
              <span>{cartTotal.toLocaleString('vi-VN')}đ</span>
            </div>

            {/* PHẦN THÊM MỚI: Hiển thị số tiền được giảm nếu có */}
            {appliedVoucher && (
              <div className="flex justify-between items-center text-sm text-red-500 font-medium">
                <span>Giảm giá ({appliedVoucher.code})</span>
                <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            )}

            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-bold text-gray-800">Tổng thanh toán</span>
              <span className="text-2xl font-black text-green-600">
                {finalTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>

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