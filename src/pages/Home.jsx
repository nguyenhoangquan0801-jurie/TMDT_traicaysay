import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const mockProducts = [
  { id: 1, name: "Chuối Sấy Dẻo", price: 45000, oldPrice: 55000, image: "https://picsum.photos/id/1015/300/300" },
  { id: 2, name: "Mít Sấy Giòn", price: 65000, oldPrice: 85000, image: "https://picsum.photos/id/102/300/300" },
  { id: 3, name: "Thanh Long Sấy", price: 52000, oldPrice: 62000, image: "https://picsum.photos/id/201/300/300" },
  { id: 4, name: "Khoai Lang Sấy", price: 38000, oldPrice: 48000, image: "https://picsum.photos/id/292/300/300" },
  { id: 5, name: "Dừa Sấy", price: 72000, oldPrice: 89000, image: "https://picsum.photos/id/133/300/300" },
  { id: 6, name: "Xoài Sấy", price: 59000, oldPrice: 75000, image: "https://picsum.photos/id/431/300/300" },
];

const categories = [
  { name: "Trái Cây Sấy", image: "https://picsum.photos/id/1080/300/300", count: "48 sản phẩm" },
  { name: "Đặc Sản Vùng Miền", image: "https://picsum.photos/id/669/300/300", count: "32 sản phẩm" },
  { name: "Hoa Quả Sấy Giòn", image: "https://picsum.photos/id/870/300/300", count: "25 sản phẩm" },
  { name: "Combo Tiết Kiệm", image: "https://picsum.photos/id/1060/300/300", count: "18 sản phẩm" },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroBanner />

      {/* Danh mục sản phẩm */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-center text-gray-600 mb-12">Khám phá các dòng sản phẩm chất lượng cao</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="group border border-gray-100 hover:border-green-600 rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
                  <p className="text-green-600 font-medium">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-bold">Sản Phẩm Bán Chạy</h2>
              <p className="text-gray-600 mt-2">Được khách hàng tin tưởng và lựa chọn nhiều nhất</p>
            </div>
            <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Lý do chọn chúng tôi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Tại Sao Nên Chọn Nông Lâm Store?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Chúng tôi mang đến những sản phẩm trái cây sấy và hạt dinh dưỡng chất lượng cao nhất
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-md transition">
              <div className="text-5xl mb-6">🌱</div>
              <h3 className="font-semibold text-xl mb-3">Nguồn Gốc Rõ Ràng</h3>
              <p className="text-gray-600">Hợp tác trực tiếp với nông dân và trang trại uy tín</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-md transition">
              <div className="text-5xl mb-6">❄️</div>
              <h3 className="font-semibold text-xl mb-3">Công Nghệ Sấy Lạnh</h3>
              <p className="text-gray-600">Giữ nguyên 95% dinh dưỡng và hương vị tự nhiên</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-md transition">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="font-semibold text-xl mb-3">Giao Hàng Tận Tâm</h3>
              <p className="text-gray-600">Miễn phí vận chuyển cho đơn từ 500.000đ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold text-red-600">🔥 Flash Sale - Giá Sốc Hôm Nay</h2>
            <p className="text-red-500 font-medium">Còn lại: 23 giờ 45 phút</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Giữ nguyên như bạn có */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-3xl font-bold mb-4"> nonglamfood</div>
          <p className="text-gray-400">Trái cây sấy nguyên chất - Đặc sản Việt Nam</p>
          <p className="text-gray-500 mt-8">© 2025 Nông Lâm Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;