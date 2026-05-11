import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    cart,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const MAX_QTY = 15;

  // =========================
  // FORM
  // =========================
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // =========================
  // MESSAGE
  // =========================
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SHOW MESSAGE
  // =========================
  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({
        text: '',
        type: '',
      });
    }, 3000);
  };

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    // Chưa có sản phẩm
    if (cart.length === 0) {
      showMessage(
        'Giỏ hàng của bạn đang trống',
        'error'
      );
      return;
    }

    // Validate form
    if (
      !form.name ||
      !form.phone ||
      !form.address
    ) {
      showMessage(
        'Vui lòng nhập đầy đủ thông tin',
        'error'
      );
      return;
    }

    // Giới hạn số lượng
    if (cartCount > MAX_QTY) {
      showMessage(
        'Không thể thanh toán quá 15 sản phẩm',
        'error'
      );
      return;
    }

    // Thành công
    clearCart();

    showMessage(
      'Thanh toán thành công',
      'success'
    );

    // Redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-8
        "
      >
        {/* LEFT */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            border
            border-gray-100
            p-8
            md:p-10
          "
        >
          {/* TITLE */}
          <div className="mb-8">
            <span
              className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >
              CHECKOUT
            </span>

            <h1 className="text-4xl font-bold text-gray-800 mt-5">
              Thanh toán đơn hàng
            </h1>

            <p className="text-gray-500 mt-3">
              Vui lòng điền đầy đủ thông tin nhận hàng
            </p>
          </div>

          {/* MESSAGE */}
          {message.text && (
            <div
              className={`
                mb-6
                rounded-2xl
                px-5
                py-4
                text-sm
                font-medium
                border
                ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                }
              `}
            >
              {message.text}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Họ và tên
              </label>

              <input
                type="text"
                name="name"
                placeholder="Nhập họ tên..."
                value={form.name}
                onChange={handleChange}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                  duration-200
                "
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Nhập số điện thoại..."
                value={form.phone}
                onChange={handleChange}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                  duration-200
                "
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Địa chỉ giao hàng
              </label>

              <textarea
                name="address"
                rows="4"
                placeholder="Nhập địa chỉ..."
                value={form.address}
                onChange={handleChange}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  resize-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                  duration-200
                "
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleCheckout}
              className="
                flex-1
                py-4
                rounded-2xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-semibold
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
              "
            >
              Xác nhận thanh toán
            </button>

            <button
              onClick={() => navigate('/')}
              className="
                flex-1
                py-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                hover:bg-gray-50
                text-gray-700
                font-semibold
                transition-all
                duration-300
              "
            >
              Quay về trang chủ
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            border
            border-gray-100
            p-8
            md:p-10
            h-fit
          "
        >
          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Đơn hàng của bạn
            </h2>

            <p className="text-gray-500 mt-2">
              {cartCount} sản phẩm trong giỏ hàng
            </p>
          </div>

          {/* EMPTY */}
          {cart.length === 0 ? (
            <div
              className="
                bg-gray-50
                border
                border-gray-100
                rounded-3xl
                py-16
                text-center
              "
            >
              <h3 className="text-xl font-semibold text-gray-700">
                Chưa có sản phẩm
              </h3>

              <p className="text-gray-400 mt-2">
                Hãy thêm sản phẩm vào giỏ hàng
              </p>
            </div>
          ) : (
            <>
              {/* PRODUCTS */}
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      gap-4
                      p-4
                      rounded-3xl
                      bg-gray-50
                      border
                      border-gray-100
                    "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                        w-24
                        h-24
                        rounded-2xl
                        overflow-hidden
                        bg-gray-100
                        flex-shrink-0
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Số lượng: {item.quantity}
                      </p>

                      <p className="text-green-600 font-bold text-xl mt-3">
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString('vi-VN')}
                        đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div
                className="
                  mt-8
                  pt-6
                  border-t
                  border-dashed
                  border-gray-300
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    Tổng thanh toán
                  </span>

                  <span className="text-3xl font-bold text-green-600">
                    {cartTotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-3">
                  Đã bao gồm toàn bộ chi phí vận chuyển
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;