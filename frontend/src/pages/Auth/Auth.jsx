import { useState } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const Auth = () => {
/*
    login
    register
    forgot
    reset
  */

const [currentView, setCurrentView] = useState("login");

return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-5 py-10">

    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}

        <div className="hidden md:flex bg-green-700 text-white p-10 flex-col justify-center">

        <img
            src="/images/auth/banner.png"
            alt="banner"
            className="w-full rounded-2xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">
            NongLam Food
        </h1>

        <p className="leading-8 text-green-100">
            Trái cây sấy tự nhiên,
            chất lượng cao,
            an toàn cho sức khỏe.

            <br />
            <br />

            Đăng nhập để mua sắm nhanh hơn,
            theo dõi đơn hàng
            và nhận nhiều ưu đãi hấp dẫn.
        </p>
        </div>

        {/* RIGHT */}

        <div className="p-8 md:p-12">

        {currentView === "login" && (
            <LoginForm
            goRegister={() => setCurrentView("register")}
            goForgot={() => setCurrentView("forgot")}
            />
        )}

        {currentView === "register" && (
            <RegisterForm
            goLogin={() => setCurrentView("login")}
            />
        )}

        {currentView === "forgot" && (
            <ForgotPassword
            goLogin={() => setCurrentView("login")}
            goReset={() => setCurrentView("reset")}
            />
        )}

        {currentView === "reset" && (
            <ResetPassword
            goLogin={() => setCurrentView("login")}
            />
        )}

        </div>

    </div>

    </div>
);
};

export default Auth;