import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// =========================
// CONTEXT
// =========================
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// =========================
// LAYOUT COMPONENTS
// =========================
import Navbar from './components/Navbar';
import Cart from './components/Cart';

// =========================
// PUBLIC PAGES
// =========================
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// =========================
// ADMIN PAGES
// =========================
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// =========================
// SELLER PAGES
// =========================
import SellerLayout from './sellerPage/layouts/seller';
import SellerDashboard from './sellerPage/pages/sellerDash';
import SellerProducts from './sellerPage/pages/sellerProducts';

// =========================
// ROUTE PROTECTION
// =========================
import PrivateRoute from './routes/PrivateRoute';

// =========================
// 404 PAGE
// =========================
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
        {/* NUMBER */}
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

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-800 mt-4">
          Trang không tồn tại
        </h1>

        {/* DESCRIPTION */}
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

        {/* BUTTON */}
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

// =========================
// MAIN APP
// =========================
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/*route của seller*/}
            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<SellerDashboard />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="products" element={<SellerProducts />} />
            </Route>

            {/* route còn lại */}
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gray-50 text-gray-800">
                  <Navbar />
                  <Cart />
                  <main>
                    <Routes>
                      {/* PUBLIC ROUTES */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />

                      {/* ADMIN ROUTES */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route
                        path="/admin"
                        element={
                          <PrivateRoute>
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