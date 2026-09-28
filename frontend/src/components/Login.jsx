import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import API from "./services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", formData);

      // JWT Token save
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>TaskHub</h1>
        <p>Login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;