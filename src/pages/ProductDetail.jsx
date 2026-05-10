import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100">
      {/* Thanh màu gradient thay cho hình ảnh */}
      <div className="h-56 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center relative">
        <div className="text-white text-8xl opacity-20 group-hover:opacity-30 transition">
          {product.name.slice(0, 1)}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-2xl">
          {product.discount ? `-${product.discount}%` : 'NEW'}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px] text-gray-800">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-3">
          <span className="text-2xl font-bold text-green-600">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 transition font-medium">
          <ShoppingCart size={20} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;