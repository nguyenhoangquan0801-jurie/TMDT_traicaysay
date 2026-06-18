import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div
      className="relative h-[600px] md:h-[650px] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/1/5/hoa-qua-kho-1672887194389642956447.jpg')",
      }}
    >
      {/* Gradient Overlay - Đổi sang dạng radial hoặc phủ đều từ dưới lên để làm nổi bật chữ ở giữa */}
      <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-b from-black/60 via-black/40 to-black/75" />

      {/* Decorative blur blob */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex justify-center">
        
        {/* 🛠️ ĐÃ SỬA CHUẨN CĂN GIỮA: Thay đổi thành flex-col items-center text-center */}
        <div className="max-w-2xl animate-fade-in flex flex-col items-center text-center pt-4 md:pt-0">
          
          {/* Label tag */}
          <div className="inline-block mb-4">
            <span className="bg-green-500/20 border border-green-400/50 text-green-300 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm tracking-wide uppercase">
              Sản phẩm ngon như nhà trồng
            </span>
          </div>

          {/* Heading - Giữ nguyên cỡ chữ đã thu gọn và căn giữa */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
            Trái Cây Sấy
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">
              Nguyên Chất
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              Không Phụ Gia
            </span>
          </h1>

          {/* Subtext - Căn giữa nội dung đoạn văn */}
          <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-md mx-auto">
            Sản phẩm từ{' '}
            <span className="text-green-300 font-semibold">nông trại sạch</span>
            , sấy lạnh công nghệ cao — giữ trọn{' '}
            <span className="text-yellow-300 font-semibold">dinh dưỡng</span> và
            hương vị tự nhiên.
          </p>

          {/* CTA Buttons - Căn giữa 2 nút bấm bằng justify-center */}
          <div className="flex flex-wrap gap-3 justify-center mb-16 md:mb-24">
            <Link
              to="#sanpham"
              className="bg-green-500 hover:bg-green-400 active:scale-95 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-green-700/40 transition-all duration-200"
            >
              Mua Ngay
            </Link>
            <Link
              to="#gioi-thieu"
              className="border-2 border-white/70 hover:border-white hover:bg-white hover:text-gray-900 text-white font-semibold text-base px-6 py-3.5 rounded-2xl backdrop-blur-sm transition-all duration-200 active:scale-95"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 hidden md:block">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Badge 1 */}
          <div className="bg-white/95 backdrop-blur-md text-gray-800 px-5 py-3 rounded-xl shadow-xl border border-white/60 flex flex-col items-center text-center hover:bg-white transition-all duration-200 hover:-translate-y-1">
            <p className="font-bold text-green-700 text-sm">100% Tự Nhiên</p>
            <p className="text-xs text-gray-500 mt-0.5">Không chất bảo quản, không phụ gia</p>
          </div>

          {/* Badge 2 */}
          <div className="bg-white/95 backdrop-blur-md text-gray-800 px-5 py-3 rounded-xl shadow-xl border border-white/60 flex flex-col items-center text-center hover:bg-white transition-all duration-200 hover:-translate-y-1">
            <p className="font-bold text-green-700 text-sm">Công Nghệ Sấy Lạnh</p>
            <p className="text-xs text-gray-500 mt-0.5">Giữ nguyên vitamin & khoáng chất</p>
          </div>

          {/* Badge 3 */}
          <div className="bg-white/95 backdrop-blur-md text-gray-800 px-5 py-3 rounded-xl shadow-xl border border-white/60 flex flex-col items-center text-center hover:bg-white transition-all duration-200 hover:-translate-y-1">
            <p className="font-bold text-green-700 text-sm">Giao Hàng Toàn Quốc</p>
            <p className="text-xs text-gray-500 mt-0.5">Miễn phí vận chuyển từ 500.000đ</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;