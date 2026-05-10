import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra user khi reload trang
  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    // Demo tài khoản admin (bạn có thể thay đổi sau)
    if (username === 'admin' && password === 'admin123') {
      const adminData = {
        username: 'admin',
        role: 'admin',
        name: 'Quản Trị Viên'
      };
      setUser(adminData);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);