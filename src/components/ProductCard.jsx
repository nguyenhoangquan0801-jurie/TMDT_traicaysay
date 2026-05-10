import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  console.log("ProductCard rendered with:", product);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // Debug chi tiết
  if (!product) {
    console.error("🚨 ERROR: Product is undefined or null!");
    return <div className="h-96 bg-red-100 rounded-3xl">Product undefined</div>;
  }

  if (!product.name) {
    console.error("🚨 ERROR: Product exists but .name is missing!", product);
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={() => product.id && navigate(`/product/${product.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 h-full flex flex-col cursor-pointer"
    >
      <div className="h-64 bg-gray-100 relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name || 'Sản phẩm'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-6xl opacity-30">
            {product.name?.[0] || '?'}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg line-clamp-2">
          {product.name || 'Không có tên'}
        </h3>
        
        <p className="text-green-600 font-bold text-xl mt-2">
          {Number(product.price || 0).toLocaleString('vi-VN')}đ
        </p>

        <button 
          onClick={handleAddToCart}
          className="mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl mt-4"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;