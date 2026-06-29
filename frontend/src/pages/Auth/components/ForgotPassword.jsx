import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ForgotPassword = ({ goLogin, goReset }) => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      const result = await forgotPassword(email);

      if (result.success) {
        localStorage.setItem("resetEmail", email);

        goReset();
      } else {
        setError(result.message);
      }
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
          Quên mật khẩu
        </h2>

        <p className="text-gray-500 mt-2">
          Nhập email để nhận mã OTP.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
        >
          {loading
            ? "Đang gửi..."
            : "Gửi mã OTP"}
        </button>

      </form>

      <button
        onClick={goLogin}
        className="mt-6 text-green-600 hover:underline w-full"
      >
        ← Quay lại đăng nhập
      </button>

    </>
  );
};

export default ForgotPassword;