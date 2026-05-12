import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Danh sách chức năng
  const dashboardItems = [
    {
      title: 'Quản lý sản phẩm',
      description:
        'Thêm, chỉnh sửa và cập nhật thông tin sản phẩm.',
      route: '/admin/products',
    },
    {
      title: 'Quản lý đơn hàng',
      description:
        'Theo dõi trạng thái và xử lý đơn hàng khách hàng.',
      route: '/admin/orders',
    },
    {
      title: 'Quản lý người dùng',
      description:
        'Kiểm tra thông tin tài khoản và phân quyền người dùng.',
      route: '/admin/users',
    },
    {
      title: 'Thống kê doanh thu',
      description:
        'Xem báo cáo doanh thu và hiệu suất bán hàng.',
      route: '/admin/statistics',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Bảng Điều Khiển Admin
            </h1>

            <p className="text-gray-500 mt-1">
              Xin chào{' '}
              <span className="font-semibold text-green-600">
                {user?.name || 'Quản trị viên'}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              px-5
              py-2.5
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              text-white
              font-medium
              transition-all
              duration-200
              shadow-sm
              hover:shadow-md
            "
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">
              Tổng sản phẩm
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              128
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">
              Đơn hàng hôm nay
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              42
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">
              Người dùng
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              1,254
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">
              Doanh thu
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              56.8M
            </h2>
          </div>
        </div>

        {/* MANAGEMENT SECTION */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Chức năng quản lý
            </h2>

            <p className="text-gray-500 mt-1">
              Quản lý toàn bộ hệ thống cửa hàng tại đây
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className="
                  bg-white
                  border
                  border-gray-100
                  rounded-3xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  cursor-pointer
                  hover:-translate-y-1
                  group
                "
              >
                <h3
                  className="
                    text-xl
                    font-semibold
                    text-gray-800
                    group-hover:text-green-600
                    transition-colors
                    duration-300
                  "
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5">
                  <span
                    className="
                      inline-block
                      px-4
                      py-2
                      rounded-full
                      bg-green-50
                      text-green-700
                      text-sm
                      font-medium
                    "
                  >
                    Truy cập
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-14 text-center text-sm text-gray-400">
          Hệ thống quản trị cửa hàng • Admin Dashboard
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;