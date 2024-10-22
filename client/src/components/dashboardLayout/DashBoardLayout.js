import React from "react";
import "./dashBoardLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

function DashBoardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="side-bar-container">
        <Sidebar />
      </div>
      <div className="main-section-container">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default DashBoardLayout;
