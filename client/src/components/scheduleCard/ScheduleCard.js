import React, { useState } from "react";
import "./scheduleCard.css";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import Spinner from "../spinner/Spinner";
function ScheduleCard({ schedule, setSchedule }) {
  const [loading, setLoading] = useState(false);

  const deleteDate = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/schedule/${id}`,
        {
          withCredentials: true, // Enable sending cookies with the request
        }
      );
      setSchedule(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting date:", error);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading
    return () => clearTimeout(timer);
  };
  const { date, duration, eventName, location, _id } = schedule;
  return (
    <div className="schedule-card">
      <h2>{eventName}</h2>
      <p className="s-time">{duration} Minute</p>
      <p className="location">
        <CiLocationOn />
        <span>{location}</span>
      </p>
      <p className="date">{date} </p>
      <button className="delete-btn" onClick={() => deleteDate(_id)}>
        {loading ? <Spinner /> : "Cancel"}
      </button>
    </div>
  );
}

export default ScheduleCard;
