import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");

    const loginData = {
      email,
      password,
    };

    console.log("Login Data:", loginData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn " disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="switch_auth">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "blue",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
