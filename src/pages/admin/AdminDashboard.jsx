import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '30px' }}>
      <h1>Trang Quản Trị Admin</h1>
      <p>Xin chào, <strong>{user?.name}</strong>!</p>
      
      <div style={{ margin: '30px 0' }}>
        <h3>Chức năng quản lý (sẽ làm tiếp)</h3>
        <ul>
          <li>Quản lý sản phẩm</li>
          <li>Quản lý đơn hàng</li>
          <li>Quản lý người dùng</li>
        </ul>
      </div>

      <button 
        onClick={logout}
        style={{
          padding: '10px 20px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default AdminDashboard;