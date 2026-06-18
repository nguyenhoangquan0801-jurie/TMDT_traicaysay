import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  // STATES
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // REDIRECT IF LOGGED IN
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi nhập lại
    if (error) {
      setError('');
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.username || !formData.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);

      const result = await login(
        formData.username,
        formData.password
      );

      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-green-50
        via-white
        to-green-100
        flex
        items-center
        justify-center
        px-4
      "
    >
      {/* CARD */}
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-[32px]
          shadow-2xl
          border
          border-gray-100
          overflow-hidden
        "
      >
        {/* TOP */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-3xl
              bg-green-100
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              text-green-700
            "
          >
            A
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-6">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Đăng nhập để quản lý hệ thống
          </p>
        </div>

        {/* FORM */}
        <div className="px-8 pb-8">
          {/* ERROR */}
          {error && (
            <div
              className="
                mb-5
                rounded-2xl
                bg-red-50
                border
                border-red-100
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* USERNAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>

              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                  duration-200
                  bg-gray-50
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>

              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-2xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                  duration-200
                  bg-gray-50
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3.5
                rounded-2xl
                bg-green-600
                hover:bg-green-700
                disabled:opacity-70
                disabled:cursor-not-allowed
                text-white
                font-semibold
                text-base
                transition-all
                duration-200
                shadow-md
                hover:shadow-xl
                mt-2
              "
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* DEMO ACCOUNT */}
          <div
            className="
              mt-8
              rounded-2xl
              bg-gray-50
              border
              border-gray-100
              p-5
            "
          >
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Tài khoản demo
            </p>

            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Username:{' '}
                <span className="font-semibold text-gray-700">
                  admin
                </span>
              </p>

              <p>
                Password:{' '}
                <span className="font-semibold text-gray-700">
                  admin123
                </span>
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-8">
            Hệ thống quản trị cửa hàng
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;