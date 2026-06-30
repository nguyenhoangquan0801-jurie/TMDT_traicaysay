import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

const API = "http://localhost:8080/api/auth";

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
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================
  // LOGIN
  // ==========================

  const login = async (data) => {
    console.log("===== LOGIN =====");
    console.log(data);

    try {
      const res = await axios.post(`${API}/login`, {
        email: data.email,
        password: data.password,
      });

      console.log("LOGIN SUCCESS");
      console.log(res.data);

      const loginUser = {
        fullName: res.data.fullName,
        email: res.data.email,
        role: res.data.role,
      };

      setUser(loginUser);

      localStorage.setItem(
        "user",
        JSON.stringify(loginUser)
      );

      localStorage.setItem(
        "accessToken",
        res.data.token
      );

      return {
        success: true,
        data: loginUser,
      };
    } catch (err) {
      console.log("LOGIN ERROR");
      console.log(err.response);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Email hoặc mật khẩu không đúng.",
      };
    }
  };

  // ==========================
  // REGISTER
  // ==========================

  const register = async (data) => {
    console.log("===== REGISTER =====");
    console.log(data);

    try {
      const res = await axios.post(`${API}/register`, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      console.log("REGISTER SUCCESS");
      console.log(res.data);

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      console.log("REGISTER ERROR");
      console.log(err.response);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Đăng ký thất bại.",
      };
    }
  };
  // ==========================
  // GOOGLE LOGIN
    // ==========================

  const loginGoogle = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  // ==========================
  // FACEBOOK LOGIN
  // ==========================

  const loginFacebook = () => {
    alert("Facebook Login đang phát triển.");
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
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

export const useAuth = () => useContext(AuthContext);