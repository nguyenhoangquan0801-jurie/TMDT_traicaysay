import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div
      className="relative h-[650px] bg-cover bg-center flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/1/5/hoa-qua-kho-1672887194389642956447.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Decorative blur blob */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl animate-fade-in">
          
          {/* Label tag */}
          <div className="inline-block mb-4">
            <span className="bg-green-500/20 border border-green-400/50 text-green-300 text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm tracking-wide uppercase">
              Sản phẩm ngon như nhà trồng
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-5 text-white drop-shadow-lg">
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

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-200 mb-1 leading-relaxed max-w-lg">
            Sản phẩm từ{' '}
            <span className="text-green-300 font-semibold">nông trại sạch</span>
            , sấy lạnh công nghệ cao — giữ trọn{' '}
            <span className="text-yellow-300 font-semibold">dinh dưỡng</span> và
            hương vị tự nhiên.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="#sanpham"
              className="bg-green-500 hover:bg-green-400 active:scale-95 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-green-700/40 transition-all duration-200"
            >
              Mua Ngay
            </Link>
            <Link
              to="#gioi-thieu"
              className="border-2 border-white/70 hover:border-white hover:bg-white hover:text-gray-900 text-white font-semibold text-lg px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-200 active:scale-95"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Badge 1 */}
          <div className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-4 rounded-2xl shadow-xl border border-white/60 flex flex-col gap-1 hover:bg-white transition-all duration-200">
            <p className="font-bold text-green-700 text-base">100% Tự Nhiên</p>
            <p className="text-sm text-gray-500">Không chất bảo quản, không phụ gia</p>
          </div>

          {/* Badge 2 */}
          <div className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-4 rounded-2xl shadow-xl border border-white/60 flex flex-col gap-1 hover:bg-white transition-all duration-200">
            <p className="font-bold text-green-700 text-base">Công Nghệ Sấy Lạnh</p>
            <p className="text-sm text-gray-500">Giữ nguyên vitamin & khoáng chất</p>
          </div>

          {/* Badge 3 */}
          <div className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-4 rounded-2xl shadow-xl border border-white/60 flex flex-col gap-1 hover:bg-white transition-all duration-200">
            <p className="font-bold text-green-700 text-base">Giao Hàng Toàn Quốc</p>
            <p className="text-sm text-gray-500">Miễn phí vận chuyển từ 500.000đ</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
