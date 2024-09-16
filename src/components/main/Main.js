import React from "react";
import "./main.css";
import FeatureCard from "../featureCard/FeatureCard";
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

      <section className="section-2">
        <h1>
          Discover the potential for your business with this software. Sign up
          for a 7 day free trial and experience the difference.
        </h1>
      </section>

      <section className="s-2-hero-page">
        <div className="s-2-left-text">
          <h1>Get your free scheduling app now</h1>
          <p>
            Step right up and manage all of your bookings through one online
            appointment scheduler. Seamless automation enables your business to
            run like clockwork.
          </p>
        </div>
        <div className="s-2-right-figure">
          <img src="./calendar.webp" alt="" />
        </div>
      </section>
      <section className="s-3-feature">
        <div className="s-3-top-text">
          <p className="heading">Featured Services</p>
          <h1 className="title">Features that you will love</h1>
          <p className="description">
            we allows you to effortlessly book, manage, and track appointments
            with automated reminders and calendar integrations
          </p>
        </div>
        <div className="s-3-feature-list">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </section>
    </main>
  );
}

export default Main;
