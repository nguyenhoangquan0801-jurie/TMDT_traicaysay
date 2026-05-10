import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const mockProducts = [
  { id: 1, name: "Chuối Sấy Dẻo", price: 45000, oldPrice: 55000, image: "https://picsum.photos/id/1015/300/300", category: "trai-cay-say" },
  { id: 2, name: "Mít Sấy Giòn", price: 65000, oldPrice: 85000, image: "https://picsum.photos/id/102/300/300", category: "trai-cay-say" },
  { id: 3, name: "Thanh Long Sấy", price: 52000, oldPrice: 62000, image: "https://picsum.photos/id/201/300/300", category: "trai-cay-say" },
  { id: 4, name: "Khoai Lang Sấy", price: 38000, oldPrice: 48000, image: "https://picsum.photos/id/292/300/300", category: "trai-cay-say" },
  { id: 5, name: "Dừa Sấy Giòn", price: 72000, oldPrice: 89000, image: "https://picsum.photos/id/133/300/300", category: "trai-cay-say" },
  { id: 6, name: "Xoài Sấy Dẻo", price: 59000, oldPrice: 75000, image: "https://picsum.photos/id/431/300/300", category: "trai-cay-say" },
  { id: 7, name: "Hạt Macca Úc", price: 245000, oldPrice: 289000, image: "https://picsum.photos/id/870/300/300", category: "hat-dinh-duong" },
  { id: 8, name: "Hạnh Nhân Rang", price: 185000, image: "https://picsum.photos/id/669/300/300", category: "hat-dinh-duong" },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Lọc sản phẩm
  const filteredProducts = mockProducts
    .filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header của trang */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Tất Cả Sản Phẩm</h1>
          <p className="text-gray-600 mt-2">Khám phá hơn 100+ sản phẩm trái cây sấy và hạt dinh dưỡng chất lượng</p>
        </div>

        {/* Thanh tìm kiếm và lọc */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            <option value="trai-cay-say">Trái Cây Sấy</option>
            <option value="hat-dinh-duong">Hạt Dinh Dưỡng</option>
          </select>

          <select 
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sắp xếp mặc định</option>
            <option value="price-low">Giá thấp đến cao</option>
            <option value="price-high">Giá cao đến thấp</option>
            <option value="name">Tên A → Z</option>
          </select>
        </div>

        {/* Kết quả */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Hiển thị <span className="font-semibold">{filteredProducts.length}</span> sản phẩm
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-20">
              Không tìm thấy sản phẩm nào phù hợp
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;