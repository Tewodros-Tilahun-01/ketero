import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = (event) => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else setScrolled(false);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <header className={`header  ${scrolled ? "scrolled" : undefined} `}>
      <nav className="app-header">
        <div className="logo">
          <img src="./logo3.png" alt=""></img>
        </div>
        <div className="nav-wrapper">
          <ul className="middle-nav">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button className="log-out-btn">Log In</button>
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
