import React, { useEffect, useState } from "react";
import "./userData.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Spinner from "../spinner/Spinner";

function UserData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user", {
        withCredentials: true, // Enable sending cookies with the request
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true, // Enable sending cookies with the request
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading
    return () => clearTimeout(timer);
  };

  return (
    <div className="userinfo-u">
      <div className="logout-wrapper">
        <button className="logout-btn" onClick={logout}>
          {loading ? <Spinner /> : "Logout"}
        </button>
      </div>
      <div className="title"> Welcome {user.firstName}</div>
      <div className="user-detail">
        <span className="aberration">
          {user.firstName && user.firstName.charAt(0).toUpperCase()}
        </span>
        <div>
          <p>
            <CgProfile />

            <span>
              {user.firstName} {user.lastName}
            </span>
          </p>
          <p>
            <MdOutlineMailOutline />
            <span>{user.email}</span>
          </p>
          <p>
            <CiLocationOn />
            <span>{user.city}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserData;
