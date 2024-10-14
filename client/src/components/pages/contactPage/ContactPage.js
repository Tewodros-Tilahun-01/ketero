import React from "react";
import "./contactPage.css";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const ContactPage = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-page">
        <div className="left-side">
          <div className="title">
            <h1>Get in touch</h1>
            <p>we are here for you! How can we help?</p>
          </div>
          <div className="inputs">
            <div>
              <label>Name</label>
              <input type="text" className="name" />
            </div>
            <div>
              <label>Email</label>
              <input type="text" className="email" />
            </div>
            <div>
              <label>Message</label>
              <input type="text" className="message" />
            </div>
          </div>
          <div className="submit-btn">
            <input type="submit" />
          </div>
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
