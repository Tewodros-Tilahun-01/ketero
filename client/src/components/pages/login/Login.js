import React, { useState } from "react";
import "./login.css"; // Import the CSS file for styling
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          formData,
          {
            withCredentials: true, // Enable sending cookies with the request
          }
        );
        if (response.data.userAuthenticated) {
          navigate("/");
        } else {
          setMessage("Invalid credentials");
        }
      } catch (error) {}
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";

    return errors;
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <div className="lg">
          <div className="logo-signup">
            <NavLink to={"/"}>
              <img src="./logo3.png" alt=""></img>
            </NavLink>
          </div>
        </div>

        <h2 className="form-title">Log in to your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="form-input"
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="message">{message}</div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="logout-link">
          <h6>
            Don't have an account? Signup
            <span>
              <NavLink to={"/signup"}>Signup</NavLink>
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Login;