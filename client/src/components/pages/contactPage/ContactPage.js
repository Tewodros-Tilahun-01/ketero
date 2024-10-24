import React, { useState } from "react";
import "./contactPage.css";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Spinner from "../../spinner/Spinner";
const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000); // 8 seconds loading
    return () => clearTimeout(timer);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-page">
        <div className="left-side">
          <div className="title">
            <h1>Get in touch</h1>
            <p>we are here for you! How can we help?</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Message</label>
                <input
                  type="text"
                  className="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="submit-btn">
              <button>{loading ? <Spinner /> : "Submit"}</button>
            </div>
          </form>
        </div>
        <div className="right-side">
          <div className="hero-image">
            <img src="./contact_support_hero.svg" alt="" />
          </div>
          <div className="contact-detail">
            <div>
              <span>
                <FaLocationDot />
              </span>

              <label> Adis Abeba</label>
            </div>
            <div>
              <span>
                <FaPhoneAlt />
              </span>
              <label> 0900112233</label>
            </div>
            <div>
              <span>
                <MdEmail />
              </span>
              <label> teddytilahun02@gmail.com</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
