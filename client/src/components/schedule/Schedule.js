import React from "react";
import Spinner from "../spinner/Spinner";
import { useState, useEffect } from "react";
import axios from "axios";
import "./schedule.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const [formData, setFormData] = useState({
    eventName: "",
    duration: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (value) => {
    setFormData({ ...formData, date: value });
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.eventName) errors.eventName = "event name is required";
    if (!formData.duration) errors.duration = "duration is required";
    if (!formData.location) errors.location = "location is required";
    if (!formData.date) errors.date = "date is required";

    return errors;
  };

  useEffect(() => {
    const getDate = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/officerDate/${id}`,
          {
            withCredentials: true, // Enable sending cookies with the request
          }
        );
        setAvailableDates(response.data.availability || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    getDate(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost:5000/api/${id}/schedule`,
          formData,
          {
            withCredentials: true, // Enable sending cookies with the request
          }
        );
        if (res.data.states) {
          navigate("/customerdashboard/meeting");
        } else {
          setMessage(res.data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="schedule">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div>
            <label>Event Name</label>
            <input
              type="text"
              className="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
            />
            {errors.eventName && (
              <p className="error-text">{errors.eventName}</p>
            )}
          </div>
          <div>
            <label>Duration</label>
            <input
              type="number"
              className="Duration"
              name="duration"
              min={1}
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className="error-text">{errors.duration}</p>}
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              className="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>
          <label>Select a date</label>
          <select onChange={(e) => handleDateChange(e.target.value)}>
            <option value="">Choose a date</option>
            {availableDates.map((date) => (
              <option key={date.day} value={date.day}>
                {date.day}
              </option>
            ))}
          </select>
          {errors.date && <p className="error-text">{errors.date}</p>}
        </div>
        <p className="error-text main-message">{message}</p>
        <div className="submit-btn">
          {loading ? <Spinner /> : <button>Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default Schedule;
