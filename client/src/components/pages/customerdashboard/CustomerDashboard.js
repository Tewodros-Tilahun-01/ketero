import React, { useState, useEffect } from "react";
import "./customerDashboard.css";
import LoadingPage from "../../loadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function CustomerDashboard() {
  const navigate = useNavigate();

  const addOfficer = async (id) => {
    navigate(`/customerdashboard/user/${id}`);
  };

  const fetchDates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/officers", {
        withCredentials: true, // Enable sending cookies with the request
      });
      setOfficers(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dates:", error);
      setLoading(false);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <div className="customer-dashboard">
      {!loading ? (
        <div className="officer-list">
          <h4>First Name</h4>
          <h4>Last Name</h4>
          <h4>Location</h4>
          <div></div>
          <div></div>
          {officers &&
            officers.length > 0 &&
            officers.map((officer, index) => (
              <React.Fragment key={index}>
                <p key={index}>{officer.firstName}</p>

                <p>{officer.lastName}</p>
                <p>{officer.city}</p>
                <div></div>
                <div>
                  <button
                    className="add-btn"
                    onClick={() => addOfficer(officer._id)}
                  >
                    Add schedule
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

export default CustomerDashboard;
