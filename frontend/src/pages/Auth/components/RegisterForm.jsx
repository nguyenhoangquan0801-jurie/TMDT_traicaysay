import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const RegisterForm = ({ goLogin }) => {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Họ tên
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email không hợp lệ.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự.";
    }

    // Confirm
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    }

    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý điều khoản.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Đã bấm nút đăng ký");

    if (!validate()) return;

    console.log("Validate OK");

    try {
      setLoading(true);

      console.log(formData);

      const result = await register(formData);

      console.log(result);

      if (result.success) {
          alert("Đăng ký thành công!");

          goLogin();
      } else {
          alert(result.message);
      }
    } catch (err) {
        console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">

        <img
          src="/images/logo.png"
          alt="logo"
          className="w-20 mx-auto mb-4"
        />

        <h2 className="text-3xl font-bold">
          Đăng ký
        </h2>

        <p className="text-gray-500 mt-2">
          Tạo tài khoản mới
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* FULLNAME */}

        <div>

          <label className="block mb-2 font-medium">
            Họ và tên
          </label>

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName}
            </p>
          )}

        </div>

        {/* EMAIL */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}

        </div>

        {/* PHONE */}

        <div>

          <label className="block mb-2 font-medium">
            Số điện thoại
          </label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}

        </div>

        {/* PASSWORD */}

        <div>

          <label className="block mb-2 font-medium">
            Mật khẩu
          </label>

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}

        </div>

        {/* CONFIRM */}

        <div>

          <label className="block mb-2 font-medium">
            Xác nhận mật khẩu
          </label>

          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}

        </div>

        {/* AGREE */}

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />

          <span className="text-sm">
            Tôi đồng ý với điều khoản sử dụng.
          </span>

        </label>

        {errors.agree && (
          <p className="text-red-500 text-sm">
            {errors.agree}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold"
        >
          {loading
            ? "Đang đăng ký..."
            : "Đăng ký"}
        </button>

      </form>

      <div className="mt-6 text-center">

        <span className="text-gray-600">
          Đã có tài khoản?
        </span>

        <button
          onClick={goLogin}
          className="ml-2 text-green-600 font-semibold hover:underline"
        >
          Đăng nhập
        </button>

      </div>
    </>
  );
};

export default RegisterForm;