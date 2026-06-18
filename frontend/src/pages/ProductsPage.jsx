import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Đọc chính xác file data thực tế 50 sản phẩm của nhóm
import { products } from '../data/mockProducts';

const categories = [
  { label: 'Tất cả sản phẩm', value: 'all' },
  { label: 'Trái cây sấy', value: 'trai-cay-say' },
  { label: 'Flash Sale Giờ Vàng', value: 'flash-sale' },
];

const ProductsPage = () => {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Logic đếm ngược cho phần Flash Sale của nhóm
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

  // ĐỒNG BỘ DỮ LIỆU TỪ TRANG CHỦ (HOME) SANG TRANG SẢN PHẨM KHÔNG LO LỖI TRỐNG TRANG
  useEffect(() => {
    if (location.state) {
      if (location.state.categoryFilter) {
        setSelectedCategory(location.state.categoryFilter);
      }
      if (location.state.searchKeyword) {
        setSearchTerm(location.state.searchKeyword);
      } else {
        setSearchTerm('');
      }
    }
  }, [location.state]);

  // 🛠️ ĐÃ SỬA: ĐỒNG BỘ LOGIC LỌC KHỚP 100% VỚI TRANG CHỦ ĐỂ HIỆN ĐỦ 15 MÓN ĐẶC SẢN
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const sKeyword = searchTerm.toLowerCase().trim();

        // 1. Nếu người dùng click vào "Đặc Sản Vùng Miền" từ trang chủ (truyền keyword 'đặc sản')
        // Giao diện sẽ áp dụng bộ lọc đặc sản vùng miền chuẩn (tìm theo tỉnh thành giống trang chủ)
        if (sKeyword === 'đặc sản') {
          const isSpecialRegion = ['bắc giang', 'đà lạt', 'tiền giang', 'bến tre', 'đồng tháp', 'huế', 'đặc sản'].some(prov => 
            p.origin?.toLowerCase().includes(prov) || 
            p.name?.toLowerCase().includes(prov) || 
            p.tag?.toLowerCase().includes(prov)
          );
          if (!isSpecialRegion) return false;
        } 
        // 2. Nếu người dùng click vào "Hoa Quả Sấy Giòn" từ trang chủ (truyền keyword 'giòn')
        else if (sKeyword === 'giòn') {
          const isCrisp = p.name?.toLowerCase().includes('giòn') || p.tag?.toLowerCase().includes('giòn');
          if (!isCrisp) return false;
        }
        // 3. Nếu là tìm kiếm thông thường nhập bằng tay từ ô Input bên dưới
        else if (sKeyword !== '') {
          const matchSearch = p.name?.toLowerCase().includes(sKeyword) ||
                              p.origin?.toLowerCase().includes(sKeyword) ||
                              p.tag?.toLowerCase().includes(sKeyword);
          if (!matchSearch) return false;
        }

        // Lọc kết hợp thêm theo Tab Danh Mục (nếu có chọn phía dưới)
        let matchCategory = true;
        if (selectedCategory === 'trai-cay-say') {
          // Bao gồm các món thuộc nhóm trai-cay-say hoặc có chữ dẻo/khô như trang chủ
          matchCategory = p.category === 'trai-cay-say' || 
                          p.name?.toLowerCase().includes('dẻo') || 
                          p.name?.toLowerCase().includes('khô');
        } else if (selectedCategory === 'flash-sale') {
          matchCategory = (p.oldPrice && p.oldPrice > p.price) || p.tag?.toLowerCase().includes('sale');
        }

        return matchCategory;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* CHỈ HIỂN THỊ BANNER NẾU LÀ FLASH SALE */}
      {selectedCategory === 'flash-sale' && (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 py-12 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                <h1 className="text-4xl font-black uppercase tracking-tight">Flash Sale Giờ Vàng</h1>
              </div>
              <p className="text-red-100 mt-1">Săn deal chớp nhoáng - Ưu đãi ngập tràn cùng Nông Lâm Store!</p>
            </div>
            {/* Countdown widget */}
            <div className="flex items-center gap-2 font-bold text-xl bg-black/20 px-4 py-3 rounded-2xl border border-white/10">
              <span className="text-xs font-semibold text-red-100 uppercase tracking-wider mr-1">Kết thúc sau:</span>
              <span className="bg-white text-red-600 px-2.5 py-1.5 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2.5 py-1.5 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white text-red-600 px-2.5 py-1.5 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* KHU VỰC THANH BỘ LỌC TÌM KIẾM TÍNH NĂNG CAO */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tìm kiếm</label>
              <input
                type="text"
                placeholder="Nhập tên món, nơi sản xuất..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Bộ lọc danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm"
              >
                {categories.map((c, i) => <option key={i} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Sắp xếp giá</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm"
              >
                <option value="default">Mặc định</option>
                <option value="price-low">Giá: Thấp đến Cao</option>
                <option value="price-high">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Quick tab switch */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedCategory(c.value);
                  // Khi bấm tab đổi danh mục bằng tay thì xóa keyword tìm kiếm từ trang chủ để tránh xung đột
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                  selectedCategory === c.value
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* TIÊU ĐỀ SỐ LƯỢNG */}
        <div className="mt-8 mb-6">
          <p className="text-sm text-gray-500">
            Tìm thấy <span className="font-bold text-green-600">{filteredProducts.length}</span> món ăn sạch chất lượng cao phù hợp.
          </p>
        </div>

        {/* GRID HIỂN THỊ SẢN PHẨM KHỚP DATA MOCKPRODUCTS CỦA NHÓM */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const hasSale = p.oldPrice && p.oldPrice > p.price;
              const salePercent = hasSale ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
              
              // Giả lập số lượng bán dựa trên ID sản phẩm
              const fakeSold = (p.id * 3) % 20 + 5;
              const fakeStock = 30;
              const progressWidth = (fakeSold / fakeStock) * 100;

              return (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
                  <div>
                    <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      {hasSale && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded">
                          -{salePercent}% OFF
                        </span>
                      )}
                      {p.tag && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    {p.origin && (
                      <p className="text-[11px] text-gray-400 mt-0.5">Xuất xứ: {p.origin}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-green-600">
                        {p.price?.toLocaleString('vi-VN')}đ
                      </span>
                      {hasSale && (
                        <span className="text-xs text-gray-400 line-through">
                          {p.oldPrice?.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </div>

                    {/* THANH PROGRESS BAR SỐ LƯỢNG ĐÃ BÁN FLASH SALE */}
                    {selectedCategory === 'flash-sale' && (
                      <div className="mt-2.5">
                        <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden border border-gray-200 flex items-center justify-center">
                          <div 
                            className="h-full absolute left-0 top-0 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300"
                            style={{ width: `${progressWidth}%` }}
                          ></div>
                          <span className="absolute text-[9px] font-black text-gray-700 z-10 uppercase flex items-center gap-1">
                            🔥 Đã bán {fakeSold}/{fakeStock}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* NÚT THÊM VÀO GIỎ XANH LÁ CHUẨN */}
                    <button className="w-full mt-3 py-2 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-700 transition-colors shadow-sm">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl py-14 text-center">
            <span className="text-2xl">🔍</span>
            <h3 className="text-base font-bold text-gray-800 mt-2">Không có sản phẩm nào khớp bộ lọc</h3>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} className="mt-3 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg">
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;