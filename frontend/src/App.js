import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrderHistory from './components/OrderHistory';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SellerLayout from './sellerPage/layouts/seller';
import SellerDashboard from './sellerPage/pages/sellerDash';
import SellerProducts from './sellerPage/pages/sellerProducts';
import SellerSettings from './sellerPage/pages/sellerSettings';
import SellerOrder from './sellerPage/pages/sellerOrder';

// =========================
// ROUTE PROTECTION
// =========================
import PrivateRoute from './routes/PrivateRoute';

const NotFoundPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          max-w-2xl
          w-full
          bg-white
          border
          border-gray-100
          rounded-[40px]
          p-12
          text-center
          shadow-xl
        "
      >

        <div
          className="
            text-[120px]
            md:text-[160px]
            font-bold
            leading-none
            text-green-100
          "
        >
          404
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mt-4">
          Trang không tồn tại
        </h1>

        <p
          className="
            text-gray-500
            text-lg
            leading-relaxed
            mt-6
            max-w-xl
            mx-auto
          "
        >
          Trang bạn đang tìm kiếm có thể đã bị xóa,
          thay đổi đường dẫn hoặc hiện không khả dụng.
        </p>

        <a
          href="/"
          className="
            inline-flex
            items-center
            justify-center
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            transition-all
            duration-300
            shadow-lg
          "
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

          <ScrollToTop />

          <Routes>
            {/*route của seller*/}
            <Route
              path="/seller"
              element={
                <PrivateRoute allowedRoles={[2]}>
                  <SellerLayout />
                </PrivateRoute>
              }
            >

            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<SellerDashboard />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="orders" element={<SellerOrder />} />
              <Route path="settings" element={<SellerSettings />} />
            </Route>

            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gray-50 text-gray-800">
                  <Navbar />
                  <Cart />
                  <main>
                    <Routes>

                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/history" element={<OrderHistory />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route
                        path="/admin"
                        element={
                          <PrivateRoute allowedRoles={[3]}>
                            <AdminDashboard />
                          </PrivateRoute>
                        }
                      />

                      {/* 404 PAGE */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;