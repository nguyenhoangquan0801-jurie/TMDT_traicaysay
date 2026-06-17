import { useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

// 1. CHÍNH SỬA: Import mảng products chuẩn dùng chung (không dùng mảng mockProducts viết cứng nữa)
import { products } from '../data/mockProducts'; 

const categories = [
  {
    name: 'Trái Cây Sấy',
    image: 'https://picsum.photos/id/1080/600/600',
    count: '48 sản phẩm',
  },
  {
    name: 'Đặc Sản Vùng Miền',
    image: 'https://picsum.photos/id/669/600/600',
    count: '32 sản phẩm',
  },
  {
    name: 'Hoa Quả Sấy Giòn',
    image: 'https://picsum.photos/id/870/600/600',
    count: '25 sản phẩm',
  },
  {
    name: 'Combo Tiết Kiệm',
    image: 'https://picsum.photos/id/1060/600/600',
    count: '18 sản phẩm',
  },
];

const features = [
  {
    number: '01',
    title: 'Nguồn gốc rõ ràng',
    description:
      'Hợp tác trực tiếp với nông dân và trang trại uy tín trên toàn quốc.',
  },
  {
    number: '02',
    title: 'Công nghệ hiện đại',
    description:
      'Ứng dụng công nghệ sấy lạnh giúp giữ trọn hương vị tự nhiên.',
  },
  {
    number: '03',
    title: 'Giao hàng tận nơi',
    description:
      'Đóng gói cẩn thận và giao hàng nhanh chóng trên toàn quốc.',
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* HERO */}
      <HeroBanner />

      {/* CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-14">
            <span
              className="
                inline-block
                px-5
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >
              DANH MỤC
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
              Danh Mục Sản Phẩm
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Khám phá các dòng sản phẩm trái cây sấy và đặc sản
              chất lượng cao tại Nông Lâm Store.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="
                  group
                  bg-white
                  rounded-[32px]
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  cursor-pointer
                  hover:-translate-y-2
                "
              >
                {/* IMAGE */}
                <div className="overflow-hidden h-72">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-110
                      transition-transform
                      duration-700
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-7 text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {cat.name}
                  </h3>

                  <p className="text-green-600 font-medium mt-3">
                    {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-6
              mb-14
            "
          >
            <div>
              <span
                className="
                  inline-block
                  px-5
                  py-2
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-sm
                  font-semibold
                "
              >
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
              className="
                inline-flex
                items-center
                justify-center
                px-7
                py-4
                rounded-2xl
                bg-white
                border
                border-gray-200
                hover:border-green-500
                hover:text-green-600
                font-semibold
                transition-all
                duration-300
                shadow-sm
                hover:shadow-lg
              "
            >
              Xem tất cả sản phẩm
            </Link>
          </div>

          {/* PRODUCTS */}
          {/* 2. CHÍNH SỬA: Đổi sang lặp qua mảng products mới, lấy 4 món đầu tiên hiển thị bằng .slice(0, 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-16">
            <span
              className="
                inline-block
                px-5
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-semibold
              "
            >
              GIÁ TRỊ
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
              Tại Sao Chọn Chúng Tôi?
            </h2>

            <p className="text-gray-500 mt-5 max-w-3xl mx-auto text-lg leading-relaxed">
              Chúng tôi cam kết mang đến những sản phẩm sạch,
              chất lượng và tốt cho sức khỏe người tiêu dùng.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-[32px]
                  p-10
                  hover:bg-white
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                "
              >
                <div
                  className="
                    w-20
                    h-20
                    rounded-3xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    text-green-700
                  "
                >
                  {item.number}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-5 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
              mb-14
            "
          >
            <div>
              <span
                className="
                  inline-block
                  px-5
                  py-2
                  rounded-full
                  bg-red-100
                  text-red-600
                  text-sm
                  font-semibold
                "
              >
                FLASH SALE
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-red-600 mt-6">
                Giá Sốc Hôm Nay
              </h2>
            </div>

            <div
              className="
                px-6
                py-4
                rounded-2xl
                bg-white
                border
                border-red-100
                shadow-sm
              "
            >
              <p className="text-red-500 font-semibold">
                Kết thúc sau: 23 giờ 45 phút
              </p>
            </div>
          </div>

          {/* PRODUCTS */}
          {/* 3. CHÍNH SỬA: Đổi sang lặp qua mảng products mới cho khu vực Flash Sale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="
              rounded-[40px]
              bg-green-600
              px-10
              py-20
              text-center
              text-white
              shadow-2xl
            "
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Thực phẩm sạch cho
              <span className="block mt-3">
                cuộc sống khỏe mạnh
              </span>
            </h2>

            <p className="max-w-3xl mx-auto text-green-100 mt-7 text-lg leading-relaxed">
              Nông Lâm Store mang đến những sản phẩm trái cây
              sấy tự nhiên, an toàn và giàu dinh dưỡng dành cho
              mọi gia đình Việt.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
              <Link
                to="/products"
                className="
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-green-700
                  font-semibold
                  hover:bg-green-50
                  transition-all
                  duration-300
                  shadow-lg
                "
              >
                Khám phá sản phẩm
              </Link>

              <Link
                to="/contact"
                className="
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-white/30
                  bg-white/10
                  backdrop-blur
                  text-white
                  font-semibold
                  hover:bg-white/20
                  transition-all
                  duration-300
                "
              >
                Liên hệ với chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-gray-800">
            {/* BRAND */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-bold text-white">
                nonglamfood
              </h2>

              <p className="text-gray-400 mt-5 leading-relaxed max-w-lg">
                Chuyên cung cấp trái cây sấy, đặc sản vùng miền
                và thực phẩm sạch chất lượng cao tại Việt Nam.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h3 className="text-xl font-semibold mb-5">
                Điều hướng
              </h3>

              <div className="space-y-3 text-gray-400">
                <p>Trang chủ</p>
                <p>Sản phẩm</p>
                <p>Giới thiệu</p>
                <p>Liên hệ</p>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-xl font-semibold mb-5">
                Thông tin
              </h3>

              <div className="space-y-3 text-gray-400">
                <p>TP. Hồ Chí Minh</p>
                <p>support@nonglamfood.vn</p>
                <p>0123 456 789</p>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="pt-8 text-center text-gray-500">
            © 2026 Nông Lâm Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
