import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu có quy định roles và role hiện tại của user không nằm trong danh sách được phép
  if (allowedRoles && !allowedRoles.includes(Number(user.roleId))) {
    // Chuyển hướng về trang login hoặc trang không có quyền truy cập
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;