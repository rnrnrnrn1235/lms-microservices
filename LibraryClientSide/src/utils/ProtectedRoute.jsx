import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentUser.role)) return <Navigate to="/login" replace />;

  return children;
}
