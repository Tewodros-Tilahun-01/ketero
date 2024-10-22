import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

import { RiCalendarScheduleLine } from "react-icons/ri";
import { GrSchedule } from "react-icons/gr";
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
              <GrSchedule />
              <span> Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="meeting"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <RiCalendarScheduleLine />
              <span>Meeting</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
