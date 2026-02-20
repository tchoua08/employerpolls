import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((s) => s.authedUser);
  const user = useSelector((s) => (authedUser ? s.users[authedUser] : null));

  const onLogout = () => {
    dispatch({ type: "SET_AUTHED_USER", id: null });
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
        <NavLink to="/add" className="nav-link">New</NavLink>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">
              <img className="avatar-sm" src={user.avatarURL} alt={user.name} />
              {user.name}
            </span>
            <button className="btn-link" onClick={onLogout}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  );
}