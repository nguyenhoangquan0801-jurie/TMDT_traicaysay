import React from 'react';
import { Outlet, Link } from 'react-router-dom';

// base seller page
const SellerLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#d9d9d9] font-sans">
      {}
      <header className="flex items-center justify-between bg-[#ffffff] h-20 border-b-2 border-black">
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center gap-3 px-6 h-full border-r-2 border-black bg-white group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm group-hover:scale-105 transition-transform">
              NL
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                NongLam
              </span>
              <span className="text-emerald-600 font-semibold">Food</span>
            </div>
          </Link>
          
          <h1 className="ml-8 text-2xl font-bold text-black">Kênh người bán</h1>
        </div>

        {}
        <div className="flex items-center mr-10 gap-4">
          <div className="w-14 h-14 rounded-full bg-[#595959] border-1 border-black"></div>
          <span className="text-black font-semibold text-lg">Username</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {}
        <aside className="w-72 bg-[#ffffff] border-r-2 border-black flex flex-col pt-10 px-8">
          <nav className="flex flex-col gap-8">
            <Link 
              to="/seller/dashboard" 
              className="text-xl font-bold text-black hover:text-green-800 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/seller/products" 
              className="text-xl font-bold text-black hover:text-green-800 transition-colors"
            >
              Quản lý sản phẩm
            </Link>
            <Link 
              to="/seller/orders" 
              className="text-xl font-bold text-black hover:text-green-800 transition-colors"
            >
              Quản lý đơn hàng
            </Link>
            <Link 
              to="/seller/reviews" 
              className="text-xl font-bold text-black hover:text-green-800 transition-colors"
            >
              Review
            </Link>
            <Link 
              to="/seller/settings" 
              className="text-xl font-bold text-black hover:text-green-800 transition-colors"
            >
              Cài đặt shop
            </Link>
          </nav>
        </aside>

        {}
        <main className="flex-1 overflow-auto bg-[#ffffff]">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
