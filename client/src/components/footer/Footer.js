import React, { useState } from "react";

import "./footer.css";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaTelegram } from "react-icons/fa6";

function Footer() {
  const [text, setText] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");
  const subscribe = (e) => {
    e.preventDefault();
    setText("");
    setButtonText("👍");
    const timer = setTimeout(() => {
      setButtonText("Subscribe");
    }, 1000); // 1 seconds loading

    return () => clearTimeout(timer);
  };
  return (
    <footer className="footer">
      <div className="logo-social">
        <div className="logo">
          <img src="../logo3.png" alt="" />
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
          <form onSubmit={subscribe}>
            <label>Sign Up to our newsletter</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button>{buttonText}</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
