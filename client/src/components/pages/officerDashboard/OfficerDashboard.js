import React from "react";
import OfficerAvailableTime from "../../officerAvailableTime/OfficerAvailableTime";
import "./officerDashboard.css";

function OfficerDashboard() {
  return (
    <div className="officer-dashboard">
      <OfficerAvailableTime />
    </div>
  );
}

export default OfficerDashboard;
