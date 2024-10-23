import React from "react";
import "./scheduleCard.css";
import { CiLocationOn } from "react-icons/ci";

function ScheduleCard() {
  return (
    <div className="schedule-card">
      <h2>gena tour</h2>
      <p className="s-time">50 min</p>
      <p className="location">
        <CiLocationOn />
        <span>gonder</span>
      </p>
      <p className="date">20-03-2024</p>
    </div>
  );
}

export default ScheduleCard;
