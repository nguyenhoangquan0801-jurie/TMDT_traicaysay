import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;