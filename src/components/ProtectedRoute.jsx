import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, profile, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading || (user && !profile)) return <Spinner full />; // wait for role before deciding
  if (!user) return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}
