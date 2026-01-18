import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Mock authentication
    login(username);
    navigate("/dashboard");
  };

  return (
    <div className="center">
      <div className="card" style={{ maxWidth: 400 }}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={{ width: "100%", marginTop: 12 }} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
