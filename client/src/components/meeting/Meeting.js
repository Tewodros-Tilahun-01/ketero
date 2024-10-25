import React, { useState, useEffect } from "react";
import axios from "axios";
import "./meeting.css";
import DataNotFound from "../dataNotFound/DataNotFound";
import LoadingPage from "../loadingPage/LoadingPage";
import ScheduleCard from "../scheduleCard/ScheduleCard";
function Meeting() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // 8 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/schedule", {
        withCredentials: true, // Enable sending cookies with the request
      });
      setSchedule(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching schedule:", error);
    }
  };
  return (
    <div className="meeting">
      {loading ? (
        <LoadingPage />
      ) : schedule && schedule.length > 0 ? (
        <ul className="schedule-list">
          {schedule.map((schedule, index) => (
            <li key={index} className="schedule-item">
              <ScheduleCard schedule={schedule} setSchedule={setSchedule} />
            </li>
          ))}
        </ul>
      ) : (
        <DataNotFound data={"No schedule yet"} />
      )}
    </div>
  );
}

export default Meeting;
