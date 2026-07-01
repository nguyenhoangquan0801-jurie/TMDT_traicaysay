import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SellerRoute = ({ children }) => {

    const { loading, isSeller, isAdmin } = useAuth();

    if (loading) return null;

    if (!(isSeller || isAdmin)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SellerRoute;