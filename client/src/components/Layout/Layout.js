import React from "react";
import "./layout.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage";

function Layout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await axios.get("https://ketero.onrender.com/isauth", {
          withCredentials: true, // Enable sending cookies with the request
        });

        if (response.data.userAuthenticated) {
          navigate(`/${response.data.role}dashboard/availability`);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    isAuth();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="home-page">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Header />
          <Outlet /> {/* This will render the matched child route components */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
