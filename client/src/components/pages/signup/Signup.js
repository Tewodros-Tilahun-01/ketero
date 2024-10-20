import React, { useState } from "react";
import "./signup.css"; // Import the CSS file for styling
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
    age: "",
    city: "",
    phone: "",
    email: "",
    role: "",
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
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/signup",
          formData,
          {
            withCredentials: true, // Enable sending cookies with the request
          }
        );
        if (response.data.userAuthenticated) {
          navigate("/signUpSuccess");
        } else {
          setMessage("Something is wrong");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (formData.password.length <= 5)
      errors.password = "Password must be more than 5 letter";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.city) errors.city = "City is required";

    if (formData.phone.length !== 10)
      errors.phone = "Phone number must be 10 digit";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.role) errors.role = "Role selection is required";

    return errors;
  };

  return (
    <div className="form-container">
      <div className="lg">
        <div className="logo-signup">
          <NavLink to={"/"}>
            <img src="./logo3.png" alt=""></img>
          </NavLink>
        </div>
      </div>

      <h2 className="form-title">Register here</h2>
      <form onSubmit={handleSubmit}>
        <div className="fullname">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="form-input"
            />
            {errors.firstName && (
              <p className="error-text">{errors.firstName}</p>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="form-input"
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Username</label>
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
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="form-input"
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="form-input"
          />
          {errors.city && <p className="error-text">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0911223344"
            className="form-input"
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Role</label>
          <div className="form-radio-group">
            <label className="form-radio-label">
              <input
                type="radio"
                name="role"
                value="officer"
                checked={formData.role === "officer"}
                onChange={handleChange}
                className="form-radio-input"
              />
              Officer
            </label>

            <label className="form-radio-label">
              <input
                type="radio"
                name="role"
                value="customer"
                checked={formData.role === "customer"}
                onChange={handleChange}
                className="form-radio-input"
              />
              Customer
            </label>
          </div>
          {errors.role && <p className="error-text">{errors.role}</p>}
        </div>
        <div className="message">{message}</div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <div className="logout-link">
        <h6>
          Already have an account?
          <span>
            <NavLink to={"/login"}>Login</NavLink>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
