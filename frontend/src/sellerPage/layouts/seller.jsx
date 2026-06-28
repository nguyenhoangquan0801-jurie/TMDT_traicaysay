import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
  Bell,
  User
} from 'lucide-react';

const SellerLayout = () => {
  const [shopInfo, setShopInfo] = useState({
    shopName: 'Đang tải...',
    username: 'Loading...',
    role: 'Kênh Người Bán',
    notifications: 0
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/seller/info')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch seller info');
        return res.json();
      })
      .then(data => setShopInfo(data))
      .catch(err => {
        console.error('Error fetching seller info, using mock values:', err);
        setShopInfo({
          shopName: 'NongLam Food (Mock)',
          username: 'nonglam_seller',
          role: 'Shop Đối Tác',
          notifications: 3
        });
      });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800">

      <header className="flex items-center justify-between bg-white h-16 border-b border-slate-200 px-6 z-10 shadow-sm">
        <div className="flex items-center h-full">

          <Link to="/" className="flex items-center gap-3 pr-6 h-full border-r border-slate-200 bg-white group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              NL
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-800 tracking-tight">
                NongLam
              </span>
              <span className="text-emerald-600 font-semibold text-sm">Food</span>
            </div>
          </Link>

          <h1 className="ml-6 text-lg font-bold text-slate-800">Kênh Người Bán</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors relative">
            <Bell className="w-5 h-5" />
            {shopInfo.notifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800">{shopInfo.shopName}</span>
              <span className="text-[11px] font-medium text-slate-500">{shopInfo.role}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col pt-6 px-4">
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/seller/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                 ${isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink
              to="/seller/products"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                 ${isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Package className="w-4 h-4" />
              Quản lý sản phẩm
            </NavLink>

            <NavLink
              to="/seller/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                 ${isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <ShoppingBag className="w-4 h-4" />
              Quản lý đơn hàng
            </NavLink>

            <NavLink
              to="/seller/reviews"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                 ${isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <MessageSquare className="w-4 h-4" />
              Đánh giá shop
            </NavLink>

            <NavLink
              to="/seller/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all
                 ${isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              Cài đặt shop
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
