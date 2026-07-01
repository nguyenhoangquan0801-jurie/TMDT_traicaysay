import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { path: '/', label: 'Trang chủ' },
  { path: '/products', label: 'Sản phẩm' },
  { path: '/history', label: 'Đơn hàng' }, 
  { path: '/about', label: 'Câu chuyện' },
  { path: '/contact', label: 'Liên hệ' },
];

const Navbar = () => {
  console.log("Navbar render");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const {
  user,
  logout,
  isAdmin,
  isSeller,
  isCustomer,
} = useAuth();
  const location = useLocation();

  const openCart = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openCart'));
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) setIsSearchOpen(false);
  }, [isMenuOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) setIsMenuOpen(false);
  }, [isSearchOpen]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Xử lý tìm kiếm 
      console.log('Searching:', searchQuery);
    }
  }, [searchQuery]);

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) => 
    `hover:text-emerald-600 transition-colors ${
      isActive(path) ? 'text-emerald-600 font-semibold' : ''
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white text-sm py-2.5 text-center font-medium tracking-wide">
        Miễn phí vận chuyển cho đơn hàng từ 500.000đ - Giao hàng nhanh trong 24h
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md group-hover:scale-105 transition-transform">
              NL
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                NongLam
              </span>
              <span className="text-emerald-600 font-semibold">Food</span>
            </div>
          </Link>

          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <label htmlFor="desktop-search" className="sr-only">
                Tìm kiếm sản phẩm
              </label>
              <input
                id="desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm trái cây sấy, mít sấy giòn, chuối sấy dẻo..."
                className="w-full border border-gray-200 rounded-full py-3.5 pl-6 pr-14 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
              />
              <button 
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search size={22} />
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
<div className="flex items-center gap-4">

  {!user ? (
    <Link
      to="/login"
      className="flex items-center gap-2 hover:text-emerald-600 transition-colors p-2"
    >
      <User size={22} />
      <span className="hidden lg:block text-sm">
        Đăng nhập
      </span>
    </Link>
  ) : (
    <div className="relative group">

      <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
        <User size={22} />
        <span className="hidden lg:block text-sm font-medium">
          {user.fullName}
        </span>
      </button>

      <div className="absolute right-0 mt-0 w-56 bg-white rounded-xl shadow-xl border hidden group-hover:block overflow-hidden z-50">

        <div className="px-4 py-3 border-b">
          <div className="font-semibold">
            {user.fullName}
          </div>

          <div className="text-xs text-gray-500">
            {user.email}
          </div>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            🛠 Quản trị hệ thống
          </Link>
        )}

        {isSeller && (
          <Link
            to="/seller"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            🛒 Kênh người bán
          </Link>
        )}

        {isCustomer && (
          <>
            <Link
              to="/history"
              className="block px-4 py-3 hover:bg-gray-100"
            >
              📦 Đơn hàng của tôi
            </Link>

            <Link
              to="/profile"
              className="block px-4 py-3 hover:bg-gray-100"
            >
              👤 Thông tin cá nhân
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
        >
          Đăng xuất
        </button>

      </div>

    </div>
  )}

  <button
    type="button"
    onClick={openCart}
    className="relative flex items-center gap-2 hover:text-emerald-600 transition-colors p-2"
  >
    <ShoppingCart size={26} strokeWidth={2} />

    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
        {cartCount > 99 ? "99+" : cartCount}
      </span>
    )}
  </button>

  <button
    type="button"
    className="md:hidden p-2"
    onClick={toggleSearch}
  >
    <Search size={24} />
  </button>

  <button
    type="button"
    className="md:hidden p-2"
    onClick={toggleMenu}
  >
    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
  </button>

</div>
        </div>

        <nav className="hidden md:flex items-center gap-8 pb-5" aria-label="Menu chính">
          {NAV_LINKS.map(({ path, label }) => (
            <Link key={path} to={path} className={linkClasses(path)}>
              {label}
            </Link>
          ))}
        </nav>

        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-4">
            <label htmlFor="mobile-search" className="sr-only">
              Tìm kiếm sản phẩm
            </label>
            <input
              id="mobile-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              autoFocus
            />
          </form>
        )}

        {isMenuOpen && (
          <nav className="md:hidden border-t py-6 bg-white" aria-label="Menu mobile">
            <ul className="flex flex-col gap-1 px-2">
              {NAV_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={closeMenu}
                    className={`block py-3 px-2 text-lg font-medium rounded-lg hover:bg-emerald-50 transition-colors ${
                      isActive(path) ? 'text-emerald-600 bg-emerald-50' : ''
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;