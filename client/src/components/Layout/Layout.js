import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the matched child route components */}
      <Footer />
    </>
  );
}

export default Layout;
