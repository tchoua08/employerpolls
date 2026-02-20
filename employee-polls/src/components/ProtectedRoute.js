import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const authedUser = useSelector((s) => s.authedUser);
  const location = useLocation();

  if (!authedUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
