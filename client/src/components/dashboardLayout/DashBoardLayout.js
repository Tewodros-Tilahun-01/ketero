import React from "react";
import "./dashBoardLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import UserData from "../userData/UserData";

function DashBoardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="side-bar-container">
        <Sidebar />
      </div>
      <div className="main-section-container">
        <div className="user-layout">
          <UserData />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoardLayout;
