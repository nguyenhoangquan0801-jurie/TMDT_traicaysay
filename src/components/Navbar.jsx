import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  // Hàm mở giỏ hàng (kết nối với component Cart)
  const openCart = () => {
    window.dispatchEvent(new Event('openCart'));
};

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top bar */}
        <div className="bg-green-700 text-white text-sm py-2 text-center">
          Miễn phí vận chuyển cho đơn từ 500.000đ
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              🌾
            </div>
            <div>
              <span className="text-2xl font-bold text-green-700">Nông Lâm</span>
              <span className="text-green-600">Store</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm trái cây sấy, đặc sản..."
                className="w-full border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:border-green-500"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
                <Search size={22} />
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-6">
            <Link 
              to="/admin/login" 
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              <User size={22} />
              <span className="hidden md:block text-sm">Tài khoản</span>
            </Link>

            {/* Nút giỏ hàng - Sửa thành button để mở sidebar */}
            <button 
              onClick={openCart}
              className="relative flex items-center gap-1 hover:text-green-600 transition"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 pb-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Trang chủ</Link>
          <Link to="/products" className="hover:text-green-600 transition">Sản phẩm</Link>
          <Link to="/about" className="hover:text-green-600 transition">Câu chuyện</Link>
          <Link to="/contact" className="hover:text-green-600 transition">Liên hệ</Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-white">
            <div className="flex flex-col gap-4 text-gray-700 font-medium px-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>Sản phẩm</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>Câu chuyện của chúng tôi</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;