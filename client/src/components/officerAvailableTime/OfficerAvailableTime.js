import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./officerAvailableTime.css";
import LoadingPage from "../loadingPage/LoadingPage";
import DataNotFound from "../dataNotFound/DataNotFound";

const OfficerAvailableTime = () => {
  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dates", {
        withCredentials: true, // Enable sending cookies with the request
      });
      setDates(response.data.availability || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching dates:", error);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading

    return () => clearTimeout(timer);
  };

  const addDate = async () => {
    try {
      if (newDate) {
        const formattedDate = newDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
        const response = await axios.post(
          "http://localhost:5000/api/dates",
          {
            date: formattedDate,
          },
          {
            withCredentials: true,
          }
        );
        setDates(response.data.availability || []);
        setNewDate(null);
      }
    } catch (error) {
      console.error("Error adding date:", error);
    }
  };

  // Delete a date
  const deleteDate = async (date) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/dates/${date}`,
        {
          withCredentials: true, // Enable sending cookies with the request
        }
      );
      setDates(response.data.availability || []);
    } catch (error) {
      console.error("Error deleting date:", error);
    }
  };

  return (
    <div className="date-manager">
      <h2 className="sub-title">Add New Date</h2>
      <div className="date-picker-wrapper">
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
        <button className="add-btn" onClick={addDate}>
          Add Date
        </button>
      </div>
      <h1 className="title">Available Dates</h1>
      <ul className="date-list">
        {loading ? (
          <LoadingPage />
        ) : dates && dates.length > 0 ? (
          dates.map((date, index) => (
            <li key={index} className="date-item">
              {date}
              <button className="delete-btn" onClick={() => deleteDate(date)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <DataNotFound data={"select date"} />
        )}
      </ul>
    </div>
  );
};

export default OfficerAvailableTime;
