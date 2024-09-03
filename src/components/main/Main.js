import React from "react";
import "./main.css";
function Main() {
  return (
    <main>
      <section className="hero-page">
        <div className="left-text">
          <h1>Free scheduling software </h1>
          <p>
            Organize your business with 24/7 automated online booking,
            reminders, payments, and more.
          </p>
          <div className="email-filed">
            <input
              type="text"
              className="input"
              placeholder="example@gmail.com"
            />
            <button className="btn">
              <span>Start Free</span>
            </button>
            <p>
              or sign up with
              <a href="//">
                <img className="google-icon" src="./google.png" alt="" />
                <span className="sign-up-with-google"> Google</span>
              </a>
            </p>
          </div>
        </div>
        <div className="right-figure">
          <img src="./tablet.webp" alt="" />
          <video autoPlay loop muted preload="auto">
            <source src="./homepage-hero.mp4" />
          </video>
        </div>
      </section>
    </main>
  );
}

export default Main;
