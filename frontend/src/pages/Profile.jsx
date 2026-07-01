import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";



const Profile = () => {
    const { user, getProfile, loading } = useAuth();
    const [error, setError] = useState("");

    useEffect(() => {
    const loadProfile = async () => {
        try {
            setError("");
            await getProfile();
        } catch (err) {
            setError("Không thể tải thông tin tài khoản.");
        }
    };

    loadProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const handleRefresh = async () => {
        try {
            setError("");
            await getProfile();
        } catch (err) {
            setError("Không thể tải thông tin tài khoản.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-80">
                <div className="text-lg font-medium">
                    Đang tải thông tin...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Bạn chưa đăng nhập
                </h2>

                <p className="text-gray-500">
                    Vui lòng đăng nhập để xem thông tin tài khoản.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Thông tin tài khoản
                </h1>

                <button
                    onClick={handleRefresh}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Làm mới
                </button>

            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8">

                <div className="space-y-8">

                    <div>
                        <p className="text-gray-500 mb-1">
                            Họ và tên
                        </p>

                        <p className="text-2xl font-semibold">
                            {user.fullName}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 mb-1">
                            Email
                        </p>

                        <p className="text-xl">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 mb-1">
                            Vai trò
                        </p>

                        <span
                            className={`inline-block px-4 py-2 rounded-full text-white font-semibold
                                ${
                                    user.role === "ADMIN"
                                        ? "bg-red-600"
                                        : user.role === "SELLER"
                                        ? "bg-blue-600"
                                        : "bg-green-600"
                                }`}
                        >
                            {user.role}
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;