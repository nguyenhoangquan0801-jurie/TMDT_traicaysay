import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Eye, 
  Percent, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  RotateCcw, 
  ShieldAlert, 
  PackageX, 
  Sparkles,
  TrendingUp,
  PackageCheck
} from 'lucide-react';

const SellerDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [hoveredBar, setHoveredBar] = useState(null);

  // 1. Mock KPI data per time range
  const kpiData = {
    today: [
      { label: 'Doanh thu hôm nay', value: '1.450.000đ', trend: '↑ +12.5%', trendType: 'up', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
      { label: 'Đơn hàng mới', value: '12', trend: '↑ +4 đơn', trendType: 'up', icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
      { label: 'Lượt xem sản phẩm', value: '210', trend: '↓ -3.2%', trendType: 'down', icon: Eye, color: 'bg-cyan-50 text-cyan-600' },
      { label: 'Tỉ lệ chuyển đổi', value: '5.71%', trend: '↑ +0.8%', trendType: 'up', icon: Percent, color: 'bg-rose-50 text-rose-600' },
    ],
    week: [
      { label: 'Doanh thu tuần này', value: '11.890.000đ', trend: '↑ +8.2%', trendType: 'up', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
      { label: 'Đơn hàng tuần này', value: '95', trend: '↑ +14 đơn', trendType: 'up', icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
      { label: 'Lượt xem tuần này', value: '1.640', trend: '↑ +12.4%', trendType: 'up', icon: Eye, color: 'bg-cyan-50 text-cyan-600' },
      { label: 'Tỉ lệ chuyển đổi', value: '5.79%', trend: '↑ +0.3%', trendType: 'up', icon: Percent, color: 'bg-rose-50 text-rose-600' },
    ],
    month: [
      { label: 'Doanh thu tháng này', value: '48.200.000đ', trend: '↑ +15.3%', trendType: 'up', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
      { label: 'Đơn hàng tháng này', value: '380', trend: '↑ +45 đơn', trendType: 'up', icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
      { label: 'Lượt xem tháng này', value: '6.550', trend: '↑ +5.1%', trendType: 'up', icon: Eye, color: 'bg-cyan-50 text-cyan-600' },
      { label: 'Tỉ lệ chuyển đổi', value: '5.80%', trend: '↑ +0.1%', trendType: 'up', icon: Percent, color: 'bg-rose-50 text-rose-600' },
    ]
  };

  // 2. Mock To-Do counts
  const todoItems = [
    { label: 'Chờ xác nhận', count: 3, icon: Clock, color: 'bg-amber-50/50 hover:bg-amber-50 text-amber-700' },
    { label: 'Chờ lấy hàng', count: 5, icon: PackageCheck, color: 'bg-blue-50/50 hover:bg-blue-50 text-blue-700' },
    { label: 'Đã xử lý', count: 24, icon: CheckCircle, color: 'bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700' },
    { label: 'Đơn hủy', count: 1, icon: RotateCcw, color: 'bg-red-50/50 hover:bg-red-50 text-red-700' },
    { label: 'Trả hàng/Hoàn tiền', count: 0, icon: ShieldAlert, color: 'bg-purple-50/50 hover:bg-purple-50 text-purple-700' },
    { label: 'Bị tạm khóa', count: 0, icon: PackageX, color: 'bg-slate-50/50 hover:bg-slate-50 text-slate-700' },
    { label: 'Sản phẩm hết hàng', count: 2, icon: AlertTriangle, color: 'bg-orange-50/50 hover:bg-orange-50 text-orange-700' },
    { label: 'Chương trình KM', count: 1, icon: Sparkles, color: 'bg-rose-50/50 hover:bg-rose-50 text-rose-700' },
  ];

  // 3. Mock Chart Data per time range
  const chartData = {
    today: [
      { name: '06:00', sales: 120000 },
      { name: '09:00', sales: 340000 },
      { name: '12:00', sales: 450000 },
      { name: '15:00', sales: 180000 },
      { name: '18:00', sales: 260000 },
      { name: '21:00', sales: 100000 },
    ],
    week: [
      { name: 'Thứ 2', sales: 1200000 },
      { name: 'Thứ 3', sales: 1850000 },
      { name: 'Thứ 4', sales: 1400000 },
      { name: 'Thứ 5', sales: 2100000 },
      { name: 'Thứ 6', sales: 1750000 },
      { name: 'Thứ 7', sales: 2400000 },
      { name: 'Chủ Nhật', sales: 1190000 },
    ],
    month: [
      { name: 'Tuần 1', sales: 11200000 },
      { name: 'Tuần 2', sales: 13400000 },
      { name: 'Tuần 3', sales: 10800000 },
      { name: 'Tuần 4', sales: 12800000 },
    ]
  };

  // Helper to format currency values cleanly on chart axis
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  const activeKPIs = kpiData[timeRange];
  const activeChart = chartData[timeRange];
  const maxSales = Math.max(...activeChart.map(d => d.sales)) * 1.15; // padding for top of chart

  return (
    <div className="p-8 flex flex-col gap-6 bg-slate-50 min-h-full font-sans text-slate-800">
      {/* Top Banner & Time filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tổng Quan Cửa Hàng</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Chào mừng quay trở lại! Dưới đây là hiệu suất bán hàng của bạn.
          </p>
        </div>
        
        {/* Modern Pill Segmented Filter */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${timeRange === 'today' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Hôm nay
          </button>
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${timeRange === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Tuần này
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${timeRange === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Tháng này
          </button>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {activeKPIs.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-slate-950">{kpi.value}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${kpi.trendType === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {kpi.trend}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">so với kỳ trước</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Việc cần làm Section */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full inline-block"></span>
            Việc cần làm
          </h2>
          <span className="text-xs font-medium text-slate-400">Đơn hàng cần xử lý</span>
        </div>
   
        <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-50/50">
          {todoItems.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div 
                key={index} 
                className={`
                  flex flex-col items-center justify-center p-5 bg-white
                  border-slate-100 transition-all cursor-pointer hover:bg-slate-50/50
                  ${index < 4 ? 'border-b' : ''} 
                  ${(index + 1) % 4 !== 0 ? 'border-r' : ''}
                `}
              >
                <div className="relative mb-2.5 p-2 rounded-xl bg-slate-50 text-slate-600">
                  <ItemIcon className="w-5 h-5" />
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-black bg-rose-500 text-white rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sales Analysis Chart Section */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
            Phân tích doanh số
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Doanh thu tăng ổn định</span>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {/* Custom SVG clean SaaS bar chart */}
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[600px] h-64 flex flex-col justify-between relative select-none">
              
              {/* Vertical grids & bars */}
              <div className="flex-1 flex items-end justify-between border-b border-slate-200 pb-2 relative h-48">
                
                {/* Horizontal gridlines */}
                {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
                  <div 
                    key={i} 
                    className="absolute left-10 right-0 border-t border-slate-100"
                    style={{ bottom: `${ratio * 100}%` }}
                  />
                ))}

                {/* Y-axis values */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pr-2 pointer-events-none">
                  <span>{formatYAxis(maxSales)}</span>
                  <span>{formatYAxis(maxSales * 0.75)}</span>
                  <span>{formatYAxis(maxSales * 0.5)}</span>
                  <span>{formatYAxis(maxSales * 0.25)}</span>
                  <span>0</span>
                </div>

                {/* The Bars */}
                <div className="flex-1 ml-10 h-full flex items-end justify-around relative">
                  {activeChart.map((d, index) => {
                    const heightPercent = (d.sales / maxSales) * 100;
                    return (
                      <div 
                        key={index}
                        className="flex flex-col items-center group w-12 relative"
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Tooltip */}
                        {hoveredBar === index && (
                          <div className="absolute bottom-[calc(100%+8px)] z-10 bg-slate-900/95 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-md border border-slate-800 whitespace-nowrap">
                            {d.name}: <span className="text-emerald-400 font-bold">{d.sales.toLocaleString('vi-VN')}đ</span>
                          </div>
                        )}

                        {/* Modern Rounded Top Bar */}
                        <div 
                          className="w-6 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer shadow-sm"
                          style={{ height: `${Math.max(heightPercent, 5)}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="h-6 ml-10 flex justify-around items-center text-xs font-semibold text-slate-500 border-t border-slate-100 pt-2">
                {activeChart.map((d, index) => (
                  <span key={index} className="w-12 text-center">{d.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout for Recent Orders and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Recent Orders */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full inline-block"></span>
                Đơn hàng gần đây
              </h2>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {[
                { id: 'DH-9841', user: 'nguyen_an', items: '2x Mít sấy dẻo 250g', price: '180.000đ', status: 'Chờ lấy hàng', badgeClass: 'bg-blue-50 text-blue-700 border-blue-100' },
                { id: 'DH-9840', user: 'tran_binh', items: '1x Hạt điều vỏ lụa, 1x Xoài sấy', price: '255.000đ', status: 'Chờ xác nhận', badgeClass: 'bg-amber-50 text-amber-700 border-amber-100' },
                { id: 'DH-9839', user: 'le_chi', items: '3x Vỏ bưởi sấy vị chanh dây', price: '165.000đ', status: 'Đã xử lý', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              ].map((order, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-800">{order.id}</span>
                      <span className="text-[10px] text-slate-400 font-medium">by {order.user}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 truncate max-w-[200px] md:max-w-xs">{order.items}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-slate-900 text-sm">{order.price}</span>
                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${order.badgeClass}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400">Cập nhật lúc: 23:20 hôm nay</span>
          </div>
        </section>

        {/* Right Column: Inventory Stock Alerts */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full inline-block"></span>
                Cảnh báo kho hàng
              </h2>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
                Cần nhập hàng
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                { name: 'Mít sấy dẻo thượng hạng 250g', stock: 2, status: 'Còn rất ít', badgeClass: 'bg-orange-50 text-orange-700 border-orange-100' },
                { name: 'Xoài sấy dẻo đặc sản 500g', stock: 0, status: 'Hết hàng', badgeClass: 'bg-rose-50 text-rose-700 border-rose-100' },
                { name: 'Hạt Macca nứt vỏ Đắk Lắk 500g', stock: 4, status: 'Còn ít', badgeClass: 'bg-amber-50 text-amber-700 border-amber-100' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-slate-800">{item.name}</span>
                    <span className="text-xs font-medium text-slate-400">Số lượng hiện tại: <span className="font-bold text-slate-700">{item.stock}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${item.badgeClass}`}>
                      {item.status}
                    </span>
                    <button className="text-xs font-semibold border border-slate-200 bg-white text-slate-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-950 transition-all">
                      Nhập hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400">Đồng bộ tự động với kho dữ liệu hệ thống</span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SellerDashboard;