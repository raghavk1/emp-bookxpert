import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header card">
      <h3>Employee Dashboard</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>👋 {username}</span>
        <button className="secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
