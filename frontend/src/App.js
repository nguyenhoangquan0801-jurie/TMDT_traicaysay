import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import OrderHistory from './components/OrderHistory';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import Auth from "./pages/Auth/Auth";
import OAuth2Success from "./pages/OAuth2Success";

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import SellerLayout from './sellerPage/layouts/seller';
import SellerDashboard from './sellerPage/pages/sellerDash';
import SellerProducts from './sellerPage/pages/sellerProducts';

import PrivateRoute from './routes/PrivateRoute';


const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <Cart />
      <main>{children}</main>
    </div>
  );
};

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

            {/* ================= CLIENT ================= */}

            <Route
              path="/"
              element={
                <ClientLayout>
                  <Home />
                </ClientLayout>
              }
            />

            <Route
              path="/products"
              element={
                <ClientLayout>
                  <ProductsPage />
                </ClientLayout>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ClientLayout>
                  <ProductDetail />
                </ClientLayout>
              }
            />

            <Route
              path="/checkout"
              element={
                <ClientLayout>
                  <CheckoutPage />
                </ClientLayout>
              }
            />

            <Route
              path="/history"
              element={
                <ClientLayout>
                  <OrderHistory />
                </ClientLayout>
              }
            />

            <Route
              path="/about"
              element={
                <ClientLayout>
                  <AboutPage />
                </ClientLayout>
              }
            />

            <Route
              path="/contact"
              element={
                <ClientLayout>
                  <ContactPage />
                </ClientLayout>
              }
            />

            {/* ================= AUTH ================= */}

            <Route
              path="/login"
              element={<Auth />}
            />

            <Route
              path="/oauth2/success"
              element={<OAuth2Success />}
            />

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["ADMIN"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* ================= SELLER ================= */}

            <Route
              path="/seller"
              element={
                <PrivateRoute roles={["SELLER"]}>
                  <SellerLayout />
                </PrivateRoute>
              }
              >
              <Route
                index
                element={<SellerDashboard />}
              />

              <Route
                path="dashboard"
                element={<SellerDashboard />}
              />

              <Route
                path="products"
                element={<SellerProducts />}
              />
            </Route>

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={<NotFoundPage />}
            />

          </Routes>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;