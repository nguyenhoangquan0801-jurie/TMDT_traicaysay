import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center flex items-center" 
         style={{ 
           backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?fruit,dried')",
           backgroundPosition: 'center'
         }}>
      
      {/* Overlay tối */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-white z-10">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Trái Cây Sấy<br />
            <span className="text-green-400">Nguyên Chất - Không Phụ Gia</span>
          </h1>
          
          <p className="text-xl mb-8 text-gray-100">
            Sản phẩm từ nông trại sạch, sấy lạnh giữ trọn dinh dưỡng và hương vị tự nhiên
          </p>

          <div className="flex gap-4">
            <Link 
              to="#sanpham" 
              className="btn-primary text-lg px-10 py-4 rounded-2xl"
            >
              Mua Ngay
            </Link>
            <Link 
              to="#" 
              className="border-2 border-white hover:bg-white hover:text-black text-lg px-8 py-4 rounded-2xl transition"
            >
              Xem Thêm
            </Link>
          </div>
        </div>
      </div>

      {/* Trust badges - Đã sửa theo yêu cầu */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6">
        <div className="bg-white/95 text-gray-800 px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
          <span className="text-2xl"></span>
          <div>
            <p className="font-semibold">100% Tự Nhiên</p>
            <p className="text-sm text-gray-600">Không chất bảo quản</p>
          </div>
        </div>

        <div className="bg-white/95 text-gray-800 px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
          <span className="text-2xl"></span>
          <div>
            <p className="font-semibold">Công Nghệ Sấy Lạnh</p>
            <p className="text-sm text-gray-600">Giữ nguyên dinh dưỡng</p>
          </div>
        </div>

        <div className="bg-white/95 text-gray-800 px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
          <span className="text-2xl"></span>
          <div>
            <p className="font-semibold">Giao Hàng Toàn Quốc</p>
            <p className="text-sm text-gray-600">Miễn phí từ 500.000đ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;