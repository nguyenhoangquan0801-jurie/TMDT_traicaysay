import { useMemo, useState, useEffect } from 'react'; 
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

// Import mảng products chuẩn gồm 50 sản phẩm thực tế của bạn
import { products } from '../data/mockProducts'; 

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // ⏱️ Bộ đếm ngược thời gian thực cho Flash Sale
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = useMemo(() => {
    // 1. Trái cây sấy dẻo / nguyên vị
    const fruitList = products.filter(p => 
      p.name.toLowerCase().includes('dẻo') || 
      p.name.toLowerCase().includes('khô') || 
      p.category === 'trai-cay-say'
    );
    
    // 2. Đặc sản vùng miền
    const specialList = products.filter(p => 
      ['bắc giang', 'đà lạt', 'tiền giang', 'bến tre', 'đồng tháp', 'huế', 'đặc sản'].some(prov => 
        p.origin?.toLowerCase().includes(prov) || p.name.toLowerCase().includes(prov) || p.tag?.toLowerCase().includes(prov)
      )
    );

    // 3. Hoa quả sấy giòn
    const crispList = products.filter(p => 
      p.name.toLowerCase().includes('giòn') || p.tag?.toLowerCase().includes('giòn')
    );

    return [
      {
        name: 'Trái Cây Sấy',
        image: products.find(p => p.id === 15)?.image || '/assets/dautaysay.png', 
        filterType: 'trai-cay-say',
        searchKeyword: '', 
        count: `${fruitList.length} sản phẩm`,
      },
      {
        name: 'Đặc Sản Vùng Miền',
        image: products.find(p => p.id === 27)?.image || '/assets/vaithieukho.png', 
        filterType: 'trai-cay-say', 
        searchKeyword: 'đặc sản',    
        count: `${specialList.length} sản phẩm`,
      },
      {
        name: 'Hoa Quả Sấy Giòn',
        image: products.find(p => p.id === 8)?.image || '/assets/mitsaygion.png', 
        filterType: 'trai-cay-say', 
        searchKeyword: 'giòn',       
        count: `${crispList.length} sản phẩm`,
      },
    ];
  }, []);

  // Lấy danh sách sản phẩm hiển thị trong mục Flash Sale (Tối đa 4 món)
  const homeFlashSaleProducts = useMemo(() => {
    return products
      .filter(p => p.oldPrice && p.oldPrice > p.price)
      .slice(0, 4);
  }, []);

  // Thiết lập số lượng sản phẩm hiển thị tại trang chủ
  const visibleProducts = isExpanded ? products : products.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* HERO BANNER */}
      <HeroBanner />

      {/* 1. CATEGORIES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-4">
              Danh Mục Sản Phẩm
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Khám phá các dòng sản phẩm trái cây sấy và đặc sản chất lượng cao tại Nông Lâm Store.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {categories.map((cat, index) => (
              <Link
                key={index}
                to="/products"
                state={{ 
                  categoryFilter: cat.filterType,
                  searchKeyword: cat.searchKeyword 
                }}
                className="group flex flex-col items-center bg-white transition-all duration-300 w-full max-w-[220px]"
              >
                <div className="w-full aspect-square rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-center"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500";
                    }}
                  />
                </div>

                <div className="pt-4 text-center px-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-green-600 mt-1">
                    {cat.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SECTION TẤT CẢ SẢN PHẨM */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              CỬA HÀNG
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
              Tất Cả Sản Phẩm
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Trải nghiệm trọn bộ danh sách sản phẩm sạch và thơm ngon từ hệ thống
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              {isExpanded ? 'Thu gọn sản phẩm' : 'Xem tất cả sản phẩm'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. BEST SELLER */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                BEST SELLER
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
                Sản Phẩm Bán Chạy
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                Được khách hàng yêu thích và lựa chọn nhiều nhất
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 font-semibold transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION FLASH SALE GIỜ VÀNG */}
      <section className="py-20 bg-gradient-to-b from-red-50 to-orange-50 border-t border-b border-red-100/60">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER FLASH SALE */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-3xl border border-red-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-red-600 uppercase tracking-tight">Flash Sale Giờ Vàng</h2>
                <p className="text-xs text-gray-500 mt-0.5">Ưu đãi giới hạn, làm mới sau mỗi khung giờ!</p>
              </div>
            </div>
            
            {/* Countdown timer */}
            <div className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider mr-1">Kết thúc sau:</span>
              <span className="bg-red-600 px-3 py-1.5 rounded-xl shadow-sm">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="text-red-600">:</span>
              <span className="bg-red-600 px-3 py-1.5 rounded-xl shadow-sm">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="text-red-600">:</span>
              <span className="bg-red-600 px-3 py-1.5 rounded-xl shadow-sm">{String(countdown.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* DANH SÁCH CARD SẢN PHẨM FLASH SALE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeFlashSaleProducts.map((product) => {
              const salePercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

              return (
                <div key={product.id} className="bg-white rounded-[32px] border border-red-50 p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                  <div>
                    {/* Ảnh & Nhãn % giảm giá */}
                    <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                      <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-md">
                        -{salePercent}% OFF
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 min-h-[3rem] group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4">
                    {/* Giá tiền */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-red-600">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {product.oldPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <button className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-sm">
                      Hốt Ngay Deal Sốc
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-gray-800">
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold text-white">NongLamFood</h2>
              <p className="text-gray-400 mt-5 leading-relaxed max-w-lg">
                Chuyên cung cấp trái cây sấy, đặc sản vùng miền và thực phẩm sạch chất lượng cao tại Việt Nam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-5">Điều hướng</h3>
              <div className="space-y-3 text-gray-400">
                <Link to="/" className="block hover:text-white transition-colors">Trang chủ</Link>
                <Link to="/products" className="block hover:text-white transition-colors">Sản phẩm</Link>
                <p>Giới thiệu</p>
                <p>Liên hệ</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-5">Thông tin</h3>
              <div className="space-y-3 text-gray-400">
                <p>TP. Hồ Chí Minh</p>
                <p>support@nonglamfood.vn</p>
                <p>0123 456 789</p>
              </div>
            </div>
          </div>
          <div className="pt-8 text-center text-gray-500">
            © 2026 Nông Lâm Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;