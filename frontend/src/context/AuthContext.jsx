import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD USER
  // ==========================

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================
  // LOGIN
  // ==========================

  const login = async (data) => {
    try {
      /**
       * Sau này:
       *
       * const res = await authService.login(data)
       */

      await new Promise((r) => setTimeout(r, 800));

      // Demo Admin

      if (
        data.email === "admin@gmail.com" &&
        data.password === "admin123"
      ) {
        const admin = {
          id: 1,
          fullName: "Quản trị viên",
          email: "admin@gmail.com",
          role: "ADMIN",
          provider: "LOCAL",
        };

        setUser(admin);

        localStorage.setItem("user", JSON.stringify(admin));

        localStorage.setItem("accessToken", "demo-access-token");

        return {
          success: true,
        };
      }

      // Demo Customer

      if (
        data.email === "user@gmail.com" &&
        data.password === "123456"
      ) {
        const customer = {
          id: 2,
          fullName: "Khách hàng",
          email: "user@gmail.com",
          role: "CUSTOMER",
          provider: "LOCAL",
        };

        setUser(customer);

        localStorage.setItem(
          "user",
          JSON.stringify(customer)
        );

        localStorage.setItem(
          "accessToken",
          "demo-access-token"
        );

        return {
          success: true,
        };
      }

      return {
        success: false,
        message: "Email hoặc mật khẩu không đúng.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Có lỗi xảy ra.",
      };
    }
  };

  // ==========================
  // REGISTER
  // ==========================

  const register = async (data) => {
    try {
      /**
       * authService.register(data)
       */

      await new Promise((r) => setTimeout(r, 800));

      console.log(data);

      return {
        success: true,
        message: "Đăng ký thành công.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Đăng ký thất bại.",
      };
    }
  };

  // ==========================
  // FORGOT PASSWORD
  // ==========================

  const forgotPassword = async (email) => {
    try {
      /**
       * authService.forgotPassword(email)
       */

      await new Promise((r) => setTimeout(r, 800));

      console.log(email);

      return {
        success: true,
        message: "Đã gửi OTP.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Không gửi được OTP.",
      };
    }
  };

  // ==========================
  // VERIFY OTP
  // ==========================

  const verifyOTP = async (otp) => {
    try {
      await new Promise((r) => setTimeout(r, 800));

      if (otp === "123456") {
        return {
          success: true,
        };
      }

      return {
        success: false,
        message: "OTP không đúng.",
      };
    } catch {
      return {
        success: false,
      };
    }
  };

  // ==========================
  // RESET PASSWORD
  // ==========================

  const resetPassword = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 800));

      console.log(data);

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
      };
    }
  };

  // ==========================
  // SOCIAL LOGIN
  // ==========================

  const loginGoogle = async () => {
    console.log("Google Login");
  };

  const loginFacebook = async () => {
    console.log("Facebook Login");
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");
  };

  // ==========================
  // ROLE
  // ==========================

  const isAuthenticated = !!user;

  const isAdmin = user?.role === "ADMIN";

  const isSeller = user?.role === "SELLER";

  const isCustomer = user?.role === "CUSTOMER";

  const value = useMemo(
    () => ({
      user,

      loading,

      login,

      register,

      logout,

      forgotPassword,

      verifyOTP,

      resetPassword,

      loginGoogle,

      loginFacebook,

      isAuthenticated,

      isAdmin,

      isSeller,

      isCustomer,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};