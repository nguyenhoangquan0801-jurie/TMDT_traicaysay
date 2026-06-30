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
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          username: data.username,
          role: data.role,
          roleId: data.roleId,
          name: data.role === 'ADMIN' ? 'Quản Trị Viên' : 'Chủ Shop',
        };

        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));

        return {
          success: true,
          message: data.message,
          roleId: data.roleId
        };
      }

      return {
        success: false,
        message: data.message || 'Sai tài khoản hoặc mật khẩu',
      };
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return {
        success: false,
        message: 'Không thể kết nối đến máy chủ',
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
  const isAdmin = user?.role === 'ADMIN';

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