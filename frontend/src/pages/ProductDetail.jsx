import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/mockProducts'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [mainImage, setMainImage] = useState('');

  // tìm kiếm sản phẩm theo ID 
  useEffect(() => {
    if (Array.isArray(products)) {
      const foundProduct = products.find((p) => String(p.id) === String(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        setMainImage(foundProduct.images?.[0] || foundProduct.image || '');

        let viewedIds = JSON.parse(localStorage.getItem("viewed_product_ids")) || [];
        // Lọc trùng ID cũ để đưa sản phẩm mới xem lên đầu danh sách
        viewedIds = viewedIds.filter(itemId => String(itemId) !== String(foundProduct.id));
        viewedIds.unshift(foundProduct.id);
        // Giới hạn hiển thị tối đa 12 sản phẩm trong lịch sử
        if (viewedIds.length > 12) viewedIds.pop();
        localStorage.setItem("viewed_product_ids", JSON.stringify(viewedIds));
        // Bắn sự kiện thông báo để trang History cập nhật
        window.dispatchEvent(new Event("localHistoryChanged"));
        
      }
    }
    setQuantity(1); 
  }, [id]);
 
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Thêm vào giỏ hàng 
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, image: mainImage }, quantity); 
       
    window.dispatchEvent(new Event('openCartGlobal'));
  };
 
  const handleBuyNow = () => {
    if (!product) return;
    addToCart({ ...product, image: mainImage }, quantity); 
    navigate('/checkout'); 
  };

  // Trạng thái chờ khi dữ liệu chưa kịp tải xong
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 text-gray-500">
        Đang tải dữ liệu sản phẩm...
      </div>
    );
  }

  // Tính phần trăm giảm giá 
  const oldPrice = product.oldPrice || product.price || 0;
  const currentPrice = product.price || 0;
  const discount = oldPrice > currentPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;
 
  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-sm text-gray-500">
            Trang chủ / Tất cả sản phẩm /{' '}
            <span className="text-green-600 font-medium">{product.name}</span>
          </p>
        </div>
      </div>

      // Chi tiết sản phẩm
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
           
          <div>
            <div className="flex gap-5">
             
              <div className="flex flex-col gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      mainImage === img ? 'border-green-500 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-[36px] overflow-hidden border border-gray-100 shadow-xl">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              {product.category || 'HEALTHY SNACK'}
            </span>

            <h1 className="text-4xl font-bold text-gray-800 mt-5 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-8 mt-6 text-gray-500">
              <p>Thương hiệu: <span className="text-gray-700 font-medium">{product.brand || 'Nông Lâm Store'}</span></p>
              <p>Mã sản phẩm: <span className="text-gray-700 font-medium">{product.sku || `NLF-${product.id}`}</span></p>
            </div>

            <div className="mt-8 p-6 rounded-[32px] bg-green-50 border border-green-100">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-5xl font-bold text-green-600">
                  {Number(product.price).toLocaleString('vi-VN')}đ
                </span>

                {discount > 0 && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      {Number(oldPrice).toLocaleString('vi-VN')}đ
                    </span>
                    <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              {discount > 0 && (
                <p className="text-gray-500 mt-4">
                  Tiết kiệm:{' '}
                  <span className="font-semibold text-red-500">
                    {Number(oldPrice - currentPrice).toLocaleString('vi-VN')}đ
                  </span>
                </p>
              )}
            </div>

            {/* Mô tả chi tiết */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800">Mô tả sản phẩm</h3>
              <div className="text-gray-600 leading-relaxed mt-4 text-lg space-y-3">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <>
                    <p>
                      Sản phẩm <strong>{product.name}</strong> là dòng nông sản sấy thơm ngon thượng hạng thuộc chuỗi sản phẩm chất lượng cao của Nông Lâm Đặc Sản. Nguyên liệu được tuyển chọn kỹ lưỡng từ những vùng trồng sạch, đặc biệt giữ trọn hương vị tự nhiên tinh túy từ vùng đất <strong>{product.origin || 'Việt Nam'}</strong>.
                    </p>
                    <p>
                      With quy trình chế biến hiện đại giúp giữ nhiệt độ thấp ổn định, sản phẩm không chỉ có màu sắc đẹp mắt, hương vị đậm đà mà còn bảo toàn các vitamin và khoáng chất thiết yếu. Đây là dòng sản phẩm mang phong cách độc đáo với đặc trưng <span className="px-2 py-0.5 rounded bg-green-50 border border-green-200 text-green-700 font-medium text-base">{product.tag || 'Tự nhiên'}</span>, cực kỳ thích hợp làm món ăn vặt ngon miệng mỗi ngày hoặc làm quà biếu tặng ý nghĩa.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center font-bold text-green-700">01</div>
                  <div>
                    <p className="font-semibold text-gray-800">Đồng giá ship toàn quốc 30.000đ</p>
                    <p className="text-gray-500 mt-1">Giao hàng nhanh và an toàn</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center font-bold text-green-700">02</div>
                  <div>
                    <p className="font-semibold text-gray-800">Miễn phí ship từ 300.000đ</p>
                    <p className="text-gray-500 mt-1">Áp dụng cho mọi đơn hàng toàn quốc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Các mã giảm giá */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">Mã giảm giá</h3>
              <div className="flex flex-wrap gap-4">
                {['NLF100', 'NLF300', 'NLF500', 'NLF1000'].map((code, index) => (
                  <div key={index} className="px-5 py-3 rounded-2xl bg-white border border-dashed border-green-300 text-green-700 font-semibold shadow-sm">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-5">
                <span className="font-semibold text-gray-700">Số lượng</span>
                <div className="flex items-center bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <button onClick={handleDecrease} className="w-14 h-14 text-xl font-semibold hover:bg-gray-100 transition cursor-pointer">-</button>
                  <div className="w-16 text-center font-semibold text-lg">{quantity}</div>
                  <button onClick={handleIncrease} className="w-14 h-14 text-xl font-semibold hover:bg-gray-100 transition cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mt-8">
                <button onClick={handleAddToCart} className="flex-1 py-5 rounded-3xl border-2 border-green-600 text-green-700 font-semibold text-lg hover:bg-green-50 transition-all duration-300 cursor-pointer">
                  Thêm vào giỏ hàng
                </button>
                <button onClick={handleBuyNow} className="flex-1 py-5 rounded-3xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-xl transition-all duration-300 cursor-pointer">
                  Mua ngay
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mt-12">
              {['Giao hàng nhanh', 'Ưu đãi mỗi ngày', 'Đổi trả 7 ngày'].map((text, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center mx-auto text-green-700 font-bold text-xl">
                    0{i + 1}
                  </div>
                  <p className="mt-5 font-semibold text-gray-700">{text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Các sản phẩm liên quan */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mt-6">Sản phẩm thường mua cùng</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => String(p.id) !== String(id))  
              .slice(0, 4)  
              .map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });  
                  }}
                  className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                >
                  <div className="h-72 overflow-hidden flex items-center justify-center bg-gray-50 p-4">
                    <img
                      src={item.image} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">{item.name}</h3> {/* Đồng bộ tên sản phẩm thực tế */}
                    <p className="text-green-600 font-bold text-2xl mt-4">{Number(item.price).toLocaleString('vi-VN')}đ</p> {/* Đồng bộ giá thực tế */}
                    <button 
                      className="w-full mt-6 py-3.5 rounded-2xl bg-green-600 group-hover:bg-green-700 text-white font-semibold transition text-center block"
                    >
                      Xem sản phẩm
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;