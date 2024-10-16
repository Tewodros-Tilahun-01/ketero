import React from "react";
import { NavLink } from "react-router-dom";
function SuccessSignup() {
  return (
    <>
      <div>Successfully Signup</div>
      <span>
        <NavLink to={"/login"}>Login</NavLink>
      </span>
      ;
    </>
  );
}

export default SuccessSignup;
