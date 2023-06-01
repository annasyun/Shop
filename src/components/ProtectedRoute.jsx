import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { userData } = useAuthContext();

  if (!userData || (requireAdmin && !userData.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
