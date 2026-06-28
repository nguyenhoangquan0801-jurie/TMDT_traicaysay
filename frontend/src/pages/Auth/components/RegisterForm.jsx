import { useState } from "react";
import SocialLogin from "./SocialLogin";

const RegisterForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    console.log(formData);

    // TODO:
    // axios.post("/register", formData)
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800">
        Đăng ký
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Tạo tài khoản để bắt đầu mua sắm.
      </p>

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Họ và tên"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-3"
          >
            {showConfirmPassword ? "🙈" : "👁"}
          </button>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
          Đăng ký
        </button>
      </form>

      <SocialLogin />

      <div className="text-center mt-8 text-sm">
        Đã có tài khoản?

        <button
          onClick={switchToLogin}
          className="text-green-600 ml-2 font-semibold hover:underline"
        >
          Đăng nhập
        </button>
      </div>
    </>
  );
};

export default RegisterForm;