import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

const API = "http://localhost:8080/api/auth";

// ==========================
// Axios
// ==========================

axios.defaults.baseURL = "http://localhost:8080";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================
    // LOAD USER
    // ==========================

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        const token = localStorage.getItem("accessToken");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (token) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        }

        setLoading(false);

    }, []);

    

    // ==========================
    // LOGIN
    // ==========================

    const login = async (data) => {

    try {

        const res = await axios.post(`${API}/login`, {
            email: data.email,
            password: data.password,
        });

        const token = res.data.token;

        const loginUser = {
            fullName: res.data.fullName,
            email: res.data.email,
            role: res.data.role,
        };

        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(loginUser));

        setUser(loginUser);

        return {
            success: true,
            data: loginUser,
        };

    } catch (err) {

        return {
            success: false,
            message:
                err.response?.data?.message ||
                "Đăng nhập thất bại",
        };

    }

};

    // ==========================
    // REGISTER
    // ==========================

    const register = async (data) => {

        try {

            const res = await axios.post(`${API}/register`, {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });

            return {
                success: true,
                data: res.data,
            };

        } catch (err) {

            return {
                success: false,
                message:
                    err.response?.data?.message ||
                    "Đăng ký thất bại",
            };

        }

    };

    // ==========================
    // GOOGLE
    // ==========================

    const loginGoogle = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    // ==========================
    // FACEBOOK
    // ==========================

    const loginFacebook = () => {
        alert("Facebook Login đang phát triển.");
    };

    // ==========================
    // PROFILE
    // ==========================

    const getProfile = async () => {

        try {

            const token =
                localStorage.getItem("accessToken");

            if (!token) return null;

            setLoading(true);

            const res = await axios.get(
                `${API}/profile`
            );

            setUser(res.data);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            return res.data;

        } catch (err) {

            console.error(err);

            logout();

            return null;

        } finally {

            setLoading(false);

        }

    };

    const updateProfile = async (data) => {

    const token = localStorage.getItem("accessToken");

    const res = await axios.put(
        "http://localhost:8080/api/auth/profile",
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    setUser(res.data);

    localStorage.setItem(
        "user",
        JSON.stringify(res.data)
    );

    return res.data;
};

const changePassword = async (data)=>{

    const token = localStorage.getItem("accessToken");

    await axios.put(
        "http://localhost:8080/api/auth/change-password",
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

};

    // ==========================
    // LOGOUT
    // ==========================

    const logout = () => {

        setUser(null);

        delete axios.defaults.headers.common[
            "Authorization"
        ];

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        window.location.href = "/login";

    };

    // ==========================
    // ROLE
    // ==========================

    const isAuthenticated = !!user;

    const isAdmin = user?.role === "ADMIN";

    const isSeller = user?.role === "SELLER";

    const isCustomer = user?.role === "CUSTOMER";

    // ==========================
    // CONTEXT VALUE
    // ==========================

    const value = useMemo(() => ({

        user,
        loading,

        login,
        register,
        logout,

        getProfile,
        updateProfile,
        changePassword,

        loginGoogle,
        loginFacebook,

        isAuthenticated,
        isAdmin,
        isSeller,
        isCustomer,

    }), [

        user,
        loading,
        isAuthenticated,
        isAdmin,
        isSeller,
        isCustomer,

    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);