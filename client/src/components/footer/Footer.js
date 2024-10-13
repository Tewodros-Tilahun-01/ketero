import React from "react";

import "./footer.css";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaTelegram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo-social">
        <div className="logo">
          <img src="./logo3.png" alt="" />
        </div>
        <div className="social">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
        </div>
      </div>
      <div className="features">
        <div>
          <label>Features</label>
          <ul>
            <li>Analytics</li>
            <li>SMS</li>
            <li>Booking Page</li>
          </ul>
        </div>
      </div>
      <div className="help">
        <div>
          <label>Help</label>
          <ul>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="newsletter">
        <div>
          <label>Sign Up to our newsletter</label>
          <input type="text" placeholder="example@gmail.com" />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
