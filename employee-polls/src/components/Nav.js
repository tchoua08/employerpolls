import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const navigate = useNavigate();
  const { user, isAuthed, logout } = useAuth();

  const users = useSelector((s) => s.users || {});
  const currentUser = user ? users[user] : null;

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/leaderboard" className="nav-link">
          Leaderboard
        </NavLink>

        <NavLink to="/add" className="nav-link">
          New
        </NavLink>
      </div>

      <div className="nav-right">
        {isAuthed && currentUser && (
          <>
            <span className="nav-user">
              <img
                className="avatar-sm"
                src={currentUser.avatarURL}
                alt={currentUser.name}
              />
              {currentUser.name}
            </span>

            <button className="btn-link" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}