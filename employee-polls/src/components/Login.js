import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import heroImg from "../assets/logo.png";

const Login = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = useSelector((s) => s.users || {});
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from =
  location.state?.from ||
  sessionStorage.getItem("redirectAfterLogin") ||
  "/";
  const canSubmit =
    selectedUser.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const userData = users[selectedUser];

    if (!userData) {
      setError("User not found.");
      return;
    }
    
    if (userData.password !== password.trim()) {
      setError("Incorrect password.");
      return;
    }

    setError("");
    login(selectedUser);
    sessionStorage.removeItem("redirectAfterLogin");
    navigate(from, { replace: true });
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1 className="login-title">Employee Polls</h1>

        <div className="login-hero">
          <img
            className="login-hero-img"
            src={heroImg}
            alt="Employee Polls"
          />
        </div>

        <h2 className="login-subtitle">Log In</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">User</label>

          <select
            className="login-input"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              Select a user
            </option>
            {Object.values(users).map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div style={{ color: "red", marginTop: 8 }}>{error}</div>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={!canSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;