import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function NotFound() {
    const location = useLocation();
    const { logout } = useAuth();
    const requested = location.pathname;
    if (requested && requested !=="/questions") {
       logout();
      const requested = location.pathname.split("/")[1];
       sessionStorage.setItem("redirectAfterLogin", "/"+requested);
      return (
        <Navigate to="/login" 
          replace
         />
      );
    }
  return (
    <div  className="card notfound">
      <h2>404</h2>
      <p>This poll doesnt exist.</p>
    </div>
  );
}
