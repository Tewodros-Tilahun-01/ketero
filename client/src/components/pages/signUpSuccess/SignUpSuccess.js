import React from "react";
import "./signUpSuccess.css";
import { NavLink } from "react-router-dom";

const SignUpSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Sign Up Successful!</h1>
        <p>
          Thank you for registering. You can now log in with your credentials.
        </p>
        <NavLink to={"/login"}>Login</NavLink>
      </div>
    </div>
  );
};

export default SignUpSuccess;
