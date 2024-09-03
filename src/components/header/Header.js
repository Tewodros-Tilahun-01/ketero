import React, { useEffect, useState } from "react";
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
              <a href="//">Home</a>
            </li>
            <li>
              <a href="//">Feature</a>
            </li>
            <li>
              <a href="//">Contact Us</a>
            </li>
          </ul>
          <div>
            <button className="log-out-btn">Log In</button>
            <button className="sign-up-btn">Sign Up</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
