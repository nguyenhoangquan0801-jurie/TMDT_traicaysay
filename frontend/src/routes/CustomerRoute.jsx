import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomerRoute = ({ children }) => {

    const { loading, isAuthenticated } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default CustomerRoute;