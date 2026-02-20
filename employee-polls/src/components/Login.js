import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

// Mets ton image dans: src/assets/employee-polls.png
import heroImg from "../assets/logo.png";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState(""); // UI seulement (comme la capture)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const canSubmit = user.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Dans le projet Udacity, tu peux “impersonate”:
    // Ici on met le username saisi comme authedUser
    dispatch(setAuthedUser(user.trim()));
    navigate(from, { replace: true });
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1 className="login-title">Employee Polls</h1>

        <div className="login-hero">
          <img className="login-hero-img" src={heroImg} alt="Employee Polls" />
        </div>

        <h2 className="login-subtitle">Log In</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">User</label>
          <input
            className="login-input"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit" disabled={!canSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;