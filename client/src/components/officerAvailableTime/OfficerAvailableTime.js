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
  const [newTime, setNewTime] = useState("");
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
  function toLocalISOString(date) {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date - offset);
    return localDate.toISOString().slice(0, -1);
  }
  const addDate = async () => {
    try {
      if (newDate && newTime) {
        const formattedDate = toLocalISOString(newDate).split("T")[0]; // Format date to YYYY-MM-DD
        const response = await axios.post(
          "http://localhost:5000/api/dates",
          {
            date: formattedDate,
            time: newTime,
          },
          {
            withCredentials: true,
          }
        );
        setDates(response.data.availability || []);
        setNewDate(null);
        setNewTime("");
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
        <div className="selected-time-wrapper">
          <input
            min={1}
            className="date-picker selected-time"
            type="number"
            onChange={(e) => setNewTime(e.target.value)}
            value={newTime}
          />
        </div>
        <label>min</label>
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
              <span>{date.day}</span>
              <span>{date.time} min</span>
              <button
                className="delete-btn"
                onClick={() => deleteDate(date.day)}
              >
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
