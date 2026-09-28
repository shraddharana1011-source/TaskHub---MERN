import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import API from "./services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", formData);

      alert(res.data.message);

      navigate("/");
    }catch (error) {
  console.log(error.response);
  alert(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>TaskHub</h1>
        <p>Create your account</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

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

        {}
        <input type="password" placeholder="Confirm Password" />

        <button onClick={handleSignup}>Create Account</button>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;