import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo">
        <img src="../logo3.png" alt=""></img>
      </div>
      <div className="sidebar">
        <ul className="sidebar-items">
          <li>
            <NavLink
              to="availability"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Availability
            </NavLink>
          </li>
          <li>
            <NavLink
              to="meeting"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Meeting
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
