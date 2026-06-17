import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
// 1. CHÍNH SỬA: Import mảng products chuẩn dùng chung cho toàn dự án để tránh lệch ID
import { products } from '../data/mockProducts'; 

const categories = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Trái cây sấy',
    value: 'trai-cay-say',
  },
  {
    label: 'Hạt dinh dưỡng',
    value: 'hat-dinh-duong',
  },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // =========================
  // FILTER & SORT
  // =========================
  const filteredProducts = useMemo(() => {
    // 2. CHÍNH SỬA: Lọc dựa trên mảng products dùng chung thay vì mảng mock cũ
    const result = products
      .filter((product) => {
        const matchSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchCategory =
          selectedCategory === 'all' ||
          product.category === selectedCategory;

        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') {
          return a.price - b.price;
        }

        if (sortOption === 'price-high') {
          return b.price - a.price;
        }

        if (sortOption === 'name') {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });

    return result;
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              NÔNG LÂM STORE
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mt-7">
              Tất Cả Sản Phẩm
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Khám phá bộ sưu tập trái cây sấy, hạt dinh dưỡng và thực phẩm healthy được tuyển chọn chất lượng cao dành cho mọi gia đình.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <div className="px-6 py-4 rounded-3xl bg-green-50 border border-green-100">
                <p className="text-3xl font-bold text-green-700">100+</p>
                <p className="text-gray-500 mt-1">Sản phẩm chất lượng</p>
              </div>

              <div className="px-6 py-4 rounded-3xl bg-white border border-gray-200">
                <p className="text-3xl font-bold text-gray-800">10K+</p>
                <p className="text-gray-500 mt-1">Khách hàng tin dùng</p>
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND SHAPE */}
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-green-100 opacity-40"></div>
        <div className="absolute bottom-0 right-24 w-40 h-40 rounded-full bg-green-200 opacity-30"></div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* FILTER BAR */}
          <div className="bg-white rounded-[36px] border border-gray-100 shadow-sm p-6 mb-12">
            {/* TOP */}
            <div className="flex flex-col xl:flex-row gap-5">
              {/* SEARCH */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tìm kiếm sản phẩm
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                />
              </div>

              {/* CATEGORY */}
              <div className="xl:w-72">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-green-500 transition-all"
                >
                  {categories.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* SORT */}
              <div className="xl:w-72">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sắp xếp
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-green-500 transition-all"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="name">Tên A → Z</option>
                </select>
              </div>
            </div>

            {/* CATEGORY BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(item.value)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === item.value
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* RESULT */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Danh sách sản phẩm</h2>
              <p className="text-gray-500 mt-2">
                Hiển thị <span className="font-semibold text-green-600">{filteredProducts.length}</span> sản phẩm phù hợp
              </p>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-600">Chất lượng cao • Healthy • Tự nhiên</p>
            </div>
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-[36px] py-24 px-10 text-center shadow-sm">
              <div className="w-28 h-28 rounded-full bg-gray-100 mx-auto"></div>
              <h3 className="text-3xl font-bold text-gray-800 mt-8">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                Hãy thử thay đổi từ khóa tìm kiếm hoặc lựa chọn danh mục khác để khám phá thêm sản phẩm phù hợp.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortOption('default');
                }}
                className="mt-8 px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;