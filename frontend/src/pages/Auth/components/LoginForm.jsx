import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = ({ goRegister, goForgot }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      /**
       * Sau này chỉ cần sửa login()
       * trong AuthContext là xong.
       */

      const result = await login(formData);

      if (!result.success) {
        setErrors({
          password: result.message,
        });
      }
    } catch (err) {
      setErrors({
        password: "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">

        <img
          src="/images/logo.jpg"
          alt="logo"
          className="w-20 mx-auto mb-4"
        />

        <h2 className="text-3xl font-bold text-gray-800">
          Đăng nhập
        </h2>

        <p className="text-gray-500 mt-2">
          Chào mừng bạn quay trở lại.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* EMAIL */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email}
            </p>
          )}

        </div>

        {/* PASSWORD */}

        <div>

          <label className="block mb-2 font-medium">
            Mật khẩu
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-green-400 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >

              <img
                src={
                  showPassword
                    ? "/images/auth/eye-off.jpg"
                    : "/images/auth/eye.jpg"
                }
                alt="eye"
                className="w-6"
              />

            </button>

          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password}
            </p>
          )}

        </div>

        {/* REMEMBER */}

        <div className="flex justify-between items-center">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />

            <span className="text-sm">
              Ghi nhớ đăng nhập
            </span>

          </label>

          <button
            type="button"
            onClick={goForgot}
            className="text-green-600 hover:underline text-sm"
          >
            Quên mật khẩu?
          </button>

        </div>

        {/* BUTTON */}

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

      </form>

      <SocialLogin />

      <div className="text-center mt-6">

        <span className="text-gray-600">
          Chưa có tài khoản?
        </span>

        <button
          onClick={goRegister}
          className="ml-2 text-green-600 font-semibold hover:underline"
        >
          Đăng ký ngay
        </button>

      </div>
    </>
  );
};

export default LoginForm;