import { useState, useCallback, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const NAV_LINKS = [
  { path: '/', label: 'Trang chủ' },
  { path: '/products', label: 'Sản phẩm' },
  { path: '/about', label: 'Câu chuyện' },
  { path: '/contact', label: 'Liên hệ' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Lấy mảng Cart từ CartContext 
  const {cart} = useContext(CartContext);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartCount = cart ? cart.reduce((sum, item) => sum + (item.qty || 1), 0) : 0;

  const openCart = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openCartGlobal'));
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
      // Xử lý tìm kiếm ở đây
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

          {/* Search Bar - Desktop */}
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
            <Link
              to="/admin/login"
              className="flex items-center gap-2 hover:text-emerald-600 transition-colors p-2"
              aria-label="Tài khoản"
            >
              <User size={24} strokeWidth={2} />
              <span className="hidden lg:block text-sm font-medium">
                Tài khoản
              </span>
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 hover:text-emerald-600 transition-colors p-2"
              aria-label={`Giỏ hàng${cartCount > 0 ? `, ${cartCount} sản phẩm` : ''}`}
            >
              <ShoppingCart size={26} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Buttons */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={toggleSearch}
              aria-label="Tìm kiếm"
              aria-expanded={isSearchOpen}
            >
              <Search size={24} />
            </button>

            <button
              type="button"
              className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 pb-5" aria-label="Menu chính">
          {NAV_LINKS.map(({ path, label }) => (
            <Link key={path} to={path} className={linkClasses(path)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Search */}
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

        {/* Mobile Menu */}
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
