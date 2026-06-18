import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State user
  const [user, setUser] = useState(null);

  // State loading để tránh render sai khi reload
  const [loading, setLoading] = useState(true);

  // Load user từ localStorage khi khởi động app
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('adminUser');

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Lỗi đọc dữ liệu user:', error);
      localStorage.removeItem('adminUser');
    } finally {
      setLoading(false);
    }
  }, []);

  // Hàm đăng nhập
  const login = async (username, password) => {
    try {
      // Giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Demo tài khoản admin
      if (username === 'admin' && password === 'admin123') {
        const adminData = {
          id: 1,
          username: 'admin',
          role: 'admin',
          name: 'Quản Trị Viên',
        };

        setUser(adminData);

        localStorage.setItem(
          'adminUser',
          JSON.stringify(adminData)
        );

        return {
          success: true,
          message: 'Đăng nhập thành công',
        };
      }

      return {
        success: false,
        message: 'Sai tài khoản hoặc mật khẩu',
      };
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);

      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng nhập',
      };
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  // Kiểm tra đã đăng nhập chưa
  const isAuthenticated = !!user;

  // Kiểm tra quyền admin
  const isAdmin = user?.role === 'admin';

  // Memo để tối ưu re-render
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth phải được sử dụng bên trong AuthProvider'
    );
  }

  return context;
};