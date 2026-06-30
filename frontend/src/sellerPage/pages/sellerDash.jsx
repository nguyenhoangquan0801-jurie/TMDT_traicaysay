import React, { useState, useEffect } from 'react';
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
  PackageCheck,
  ServerCrash
} from 'lucide-react';

// ─── Helper: format axis numbers ──────────────────────────────────────────────
const formatYAxis = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000)    return `${(value / 1000).toFixed(0)}k`;
  return value;
};

// ─── Sub-component: loading skeleton card ─────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm animate-pulse flex flex-col gap-3">
    <div className="h-3 bg-slate-100 rounded w-2/3" />
    <div className="h-7 bg-slate-100 rounded w-1/2 mt-2" />
    <div className="h-3 bg-slate-100 rounded w-1/3" />
  </div>
);

// ─── Sub-component: error state ───────────────────────────────────────────────
const FetchError = ({ label }) => (
  <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
    <ServerCrash className="w-4 h-4 flex-shrink-0" />
    <span>Không thể tải {label} — kiểm tra backend tại <code className="font-mono">localhost:8080</code></span>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const SellerDashboard = () => {
  const [timeRange, setTimeRange]     = useState('week');
  const [hoveredBar, setHoveredBar]   = useState(null);

  // KPI state
  const [kpiData, setKpiData]           = useState(null);
  const [kpiLoading, setKpiLoading]     = useState(true);
  const [kpiError, setKpiError]         = useState(false);

  // Todo / order counts state
  const [todoItems, setTodoItems]       = useState([]);
  const [todoLoading, setTodoLoading]   = useState(true);
  const [todoError, setTodoError]       = useState(false);

  // Chart state
  const [chartData, setChartData]       = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError]     = useState(false);

  // Recent orders state
  const [recentOrders, setRecentOrders]     = useState([]);
  const [ordersLoading, setOrdersLoading]   = useState(true);
  const [ordersError, setOrdersError]       = useState(false);

  // Low-stock alerts state
  const [stockAlerts, setStockAlerts]       = useState([]);
  const [stockLoading, setStockLoading]     = useState(true);
  const [stockError, setStockError]         = useState(false);

  // ── Todo icons map (for icon lookup by label key) ──────────────────────────
  const todoIconMap = {
    pending_confirm:  { label: 'Chờ xác nhận',      icon: Clock,        color: 'bg-amber-50/50 hover:bg-amber-50 text-amber-700' },
    pending_pickup:   { label: 'Chờ lấy hàng',      icon: PackageCheck, color: 'bg-blue-50/50 hover:bg-blue-50 text-blue-700' },
    processed:        { label: 'Đã xử lý',           icon: CheckCircle,  color: 'bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700' },
    cancelled:        { label: 'Đơn hủy',            icon: RotateCcw,    color: 'bg-red-50/50 hover:bg-red-50 text-red-700' },
    refund:           { label: 'Trả hàng/Hoàn tiền', icon: ShieldAlert,  color: 'bg-purple-50/50 hover:bg-purple-50 text-purple-700' },
    locked:           { label: 'Bị tạm khóa',        icon: PackageX,     color: 'bg-slate-50/50 hover:bg-slate-50 text-slate-700' },
    out_of_stock:     { label: 'Sản phẩm hết hàng',  icon: AlertTriangle,color: 'bg-orange-50/50 hover:bg-orange-50 text-orange-700' },
    promotion:        { label: 'Chương trình KM',    icon: Sparkles,     color: 'bg-rose-50/50 hover:bg-rose-50 text-rose-700' },
  };

  // ── Fetch KPI ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('http://localhost:8080/api/seller/dashboard/kpi')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setKpiData(d); setKpiLoading(false); })
      .catch(e => { console.error('KPI fetch failed:', e); setKpiError(true); setKpiLoading(false); });
  }, []);

  // ── Fetch todo counts ─────────────────────────────────────────────────────
  useEffect(() => {
    fetch('http://localhost:8080/api/seller/dashboard/todo')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setTodoItems(d); setTodoLoading(false); })
      .catch(e => { console.error('Todo fetch failed:', e); setTodoError(true); setTodoLoading(false); });
  }, []);

  // ── Fetch chart data ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`http://localhost:8080/api/seller/dashboard/chart?range=${timeRange}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setChartData(d); setChartLoading(false); })
      .catch(e => { console.error('Chart fetch failed:', e); setChartError(true); setChartLoading(false); });
  }, [timeRange]);

  // ── Fetch recent orders ───────────────────────────────────────────────────
  useEffect(() => {
    fetch('http://localhost:8080/api/seller/orders/recent')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setRecentOrders(d); setOrdersLoading(false); })
      .catch(e => { console.error('Orders fetch failed:', e); setOrdersError(true); setOrdersLoading(false); });
  }, []);

  // ── Fetch low-stock alerts ────────────────────────────────────────────────
  useEffect(() => {
    fetch('http://localhost:8080/api/seller/products/low-stock')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setStockAlerts(d); setStockLoading(false); })
      .catch(e => { console.error('Stock fetch failed:', e); setStockError(true); setStockLoading(false); });
  }, []);

  // ── Derived chart values ──────────────────────────────────────────────────
  const activeKPIs  = kpiData?.[timeRange] ?? [];
  const activeChart = chartData ?? [];
  const maxSales    = activeChart.length > 0
    ? Math.max(...activeChart.map(d => d.sales)) * 1.15
    : 1;

  // ── Icon helpers for KPI cards ────────────────────────────────────────────
  const kpiIcons   = [DollarSign, ShoppingBag, Eye, Percent];
  const kpiColors  = [
    'bg-emerald-50 text-emerald-600',
    'bg-amber-50 text-amber-600',
    'bg-cyan-50 text-cyan-600',
    'bg-rose-50 text-rose-600',
  ];

  return (
    <div className="p-8 flex flex-col gap-6 bg-slate-50 min-h-full font-sans text-slate-800">

      {/* ── Top Banner & Time filter ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tổng Quan Cửa Hàng</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Chào mừng quay trở lại! Dưới đây là hiệu suất bán hàng của bạn.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          {['today', 'week', 'month'].map((range, i) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {['Hôm nay', 'Tuần này', 'Tháng này'][i]}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      {kpiError ? (
        <FetchError label="chỉ số KPI" />
      ) : kpiLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[0,1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : activeKPIs.length === 0 ? (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center text-slate-400 text-sm font-medium shadow-sm">
          Chưa có dữ liệu KPI cho khoảng thời gian này.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeKPIs.map((kpi, idx) => {
            const Icon = kpiIcons[idx] ?? DollarSign;
            return (
              <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                  <div className={`p-2 rounded-lg ${kpiColors[idx]}`}>
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
      )}

      {/* ── Việc cần làm ── */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full inline-block" />
            Việc cần làm
          </h2>
          <span className="text-xs font-medium text-slate-400">Đơn hàng cần xử lý</span>
        </div>
        {todoError ? (
          <div className="p-5"><FetchError label="danh sách việc cần làm" /></div>
        ) : todoLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[0,1,2,3,4,5,6,7].map(i => (
              <div key={i} className="p-5 border-b border-r border-slate-100 animate-pulse flex flex-col items-center gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-xl" />
                <div className="h-3 bg-slate-100 rounded w-16" />
              </div>
            ))}
          </div>
        ) : todoItems.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm font-medium">
            Không có dữ liệu — backend chưa có endpoint <code className="font-mono">/api/seller/dashboard/todo</code>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-50/50">
            {todoItems.map((item, index) => {
              const meta = todoIconMap[item.key] ?? { label: item.key, icon: Clock, color: 'bg-slate-50/50 text-slate-700' };
              const ItemIcon = meta.icon;
              return (
                <div key={index} className={`flex flex-col items-center justify-center p-5 bg-white border-slate-100 transition-all cursor-pointer hover:bg-slate-50/50 ${index < 4 ? 'border-b' : ''} ${(index + 1) % 4 !== 0 ? 'border-r' : ''}`}>
                  <div className="relative mb-2.5 p-2 rounded-xl bg-slate-50 text-slate-600">
                    <ItemIcon className="w-5 h-5" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-black bg-rose-500 text-white rounded-full">{item.count}</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 text-center">{meta.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Sales Chart ── */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
            Phân tích doanh số
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Dữ liệu từ máy chủ</span>
          </div>
        </div>
        <div className="p-6 md:p-8">
          {chartError ? (
            <FetchError label="dữ liệu biểu đồ" />
          ) : chartLoading ? (
            <div className="h-48 bg-slate-50 rounded-xl animate-pulse flex items-end gap-2 px-10 pb-4">
              {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-200 rounded-t-md" style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : activeChart.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
              Chưa có dữ liệu doanh số — backend chưa có endpoint <code className="font-mono ml-1">/api/seller/dashboard/chart</code>
            </div>
          ) : (
            <div className="relative w-full overflow-x-auto">
              <div className="min-w-[600px] h-64 flex flex-col justify-between relative select-none">
                <div className="flex-1 flex items-end justify-between border-b border-slate-200 pb-2 relative h-48">
                  {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
                    <div key={i} className="absolute left-10 right-0 border-t border-slate-100" style={{ bottom: `${ratio * 100}%` }} />
                  ))}
                  <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pr-2 pointer-events-none">
                    <span>{formatYAxis(maxSales)}</span>
                    <span>{formatYAxis(maxSales * 0.75)}</span>
                    <span>{formatYAxis(maxSales * 0.5)}</span>
                    <span>{formatYAxis(maxSales * 0.25)}</span>
                    <span>0</span>
                  </div>
                  <div className="flex-1 ml-10 h-full flex items-end justify-around relative">
                    {activeChart.map((d, index) => {
                      const heightPercent = (d.sales / maxSales) * 100;
                      return (
                        <div key={index} className="flex flex-col items-center group w-12 relative" onMouseEnter={() => setHoveredBar(index)} onMouseLeave={() => setHoveredBar(null)}>
                          {hoveredBar === index && (
                            <div className="absolute bottom-[calc(100%+8px)] z-10 bg-slate-900/95 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-md border border-slate-800 whitespace-nowrap">
                              {d.name}: <span className="text-emerald-400 font-bold">{d.sales.toLocaleString('vi-VN')}đ</span>
                            </div>
                          )}
                          <div className="w-6 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer shadow-sm" style={{ height: `${Math.max(heightPercent, 5)}%` }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="h-6 ml-10 flex justify-around items-center text-xs font-semibold text-slate-500 border-t border-slate-100 pt-2">
                  {activeChart.map((d, index) => <span key={index} className="w-12 text-center">{d.name}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom: Recent Orders + Stock Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full inline-block" />
                Đơn hàng gần đây
              </h2>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {ordersError ? (
              <div className="p-5"><FetchError label="đơn hàng gần đây" /></div>
            ) : ordersLoading ? (
              <div className="divide-y divide-slate-100">
                {[0,1,2].map(i => (
                  <div key={i} className="p-4 animate-pulse flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <div className="h-3 bg-slate-100 rounded w-24" />
                      <div className="h-3 bg-slate-100 rounded w-40" />
                    </div>
                    <div className="h-5 bg-slate-100 rounded w-16" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm font-medium">
                Chưa có đơn hàng — backend chưa có endpoint <code className="font-mono">/api/seller/orders/recent</code>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentOrders.map((order, idx) => (
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
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${order.badgeClass}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400">Đồng bộ với dữ liệu máy chủ</span>
          </div>
        </section>

        {/* Stock Alerts */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full inline-block" />
                Cảnh báo kho hàng
              </h2>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">Cần nhập hàng</span>
            </div>
            {stockError ? (
              <div className="p-5"><FetchError label="cảnh báo kho hàng" /></div>
            ) : stockLoading ? (
              <div className="divide-y divide-slate-100">
                {[0,1,2].map(i => (
                  <div key={i} className="p-4 animate-pulse flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <div className="h-3 bg-slate-100 rounded w-32" />
                      <div className="h-3 bg-slate-100 rounded w-20" />
                    </div>
                    <div className="h-7 bg-slate-100 rounded w-20" />
                  </div>
                ))}
              </div>
            ) : stockAlerts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm font-medium">
                Không có sản phẩm sắp hết hàng — backend chưa có endpoint <code className="font-mono">/api/seller/products/low-stock</code>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {stockAlerts.map((item, idx) => (
                  <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm text-slate-800">{item.name}</span>
                      <span className="text-xs font-medium text-slate-400">Số lượng hiện tại: <span className="font-bold text-slate-700">{item.stock}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${item.badgeClass}`}>{item.status}</span>
                      <button className="text-xs font-semibold border border-slate-200 bg-white text-slate-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-950 transition-all">
                        Nhập hàng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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