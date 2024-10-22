import React, { useState } from "react";
import "./homePage.css";
import FeatureCard from "../../featureCard/FeatureCard";
import PaymentCard from "../../paymentCard/PaymentCard";
import FaqCard from "../../faqCard/FaqCard";
import Spinner from "../../spinner/Spinner";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  let list1 = [
    "40 Appointment/month",
    "Email Notification",
    "1 Service Type",
    "1 User",
    "iOS & Android App",
  ];
  let list2 = [
    "60 Appointment/Month",
    "Email Notification",
    "Remove Brand Watermark",
    "2 Users",
    "5 Service Type",
  ];
  let list3 = [
    "Unlimited Appointment/Month",
    "Unlimited Email Notification",
    "Unlimited SMS Notification",
    "Unlimited User",
    "Remove Brand Watermark",
    "iOS & Android App",
  ];
  let FAQs = [
    {
      question: "What’s an online Booking Page?",
      answer:
        "A Booking Page showcases your service menu, availability, and prices online. It has a custom URL and can function as a standalone website. Visitors can self-schedule and pay for appointments 24/7 without having to call, email, or travel to your premises.Sign up for your free appointment scheduler and create a Booking Page in minutes.",
    },
    {
      question:
        "What’s the difference between my ketro calendar and Booking Page?​",
      answer:
        "Your calendar is only visible to you and permitted staff members. Add appointments, edit your working hours, and get a real-time view of team schedules. When you update your availability, it reflects on your Booking Page",
    },
    {
      question:
        "How can I get more customers with free appointment scheduling software?",
      answer:
        "Your Booking Page connects to your existing website, Facebook, and Instagram, enabling people to learn about your services and self-schedule appointments 24/7. Every online channel becomes an all-new conversion machine. You can also add your Booking Page URL and QR code to emails, business cards, and promo items, helping to capitalize on interest without any wait times.",
    },
  ];

  const signup = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("dd");
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 5000); // 5 seconds loading

    // return () => clearTimeout(timer);
  };

  return (
    <div className="app">
      <main>
        <section className="hero-page">
          <div className="left-text">
            <h1>Free scheduling software </h1>
            <p>
              Organize your business with 24/7 automated online booking,
              reminders, payments, and more.
            </p>
            <form onClick={signup}>
              <div className="email-filed">
                <input
                  type="email"
                  className="input"
                  placeholder="example@gmail.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn">
                  <span>{loading ? <Spinner /> : "Start Free"}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="right-figure">
            <img src="./tablet.webp" alt="" />
            <video autoPlay loop muted preload="auto">
              <source src="./homepage-hero.mp4" />
            </video>
          </div>
        </section>

        <section className="s-2-hero-page">
          <div className="s-2-left-text">
            <h1>Get your free scheduling app now</h1>
            <p>
              Step right up and manage all of your bookings through one online
              appointment scheduler. Seamless automation enables your business
              to run like clockwork.
            </p>
          </div>
          <div className="s-2-right-figure">
            <img src="./calendar.webp" alt="" />
          </div>
        </section>
        <section className="section-2">
          <h1>
            Discover the potential for your business with this software. Sign up
            for a 7 day free trial and experience the difference.
          </h1>
        </section>
        <section className="s-3-feature" id="features">
          <div className="s-3-top-text">
            <p className="heading">Featured Services</p>
            <h1 className="title">Features that you will love</h1>
            <p className="description">
              we allows you to effortlessly book, manage, and track appointments
              with automated reminders and calendar integrations
            </p>
          </div>
          <div className="s-3-feature-list">
            <FeatureCard
              image={"./perspective_matte-26.png"}
              detail={"Analytics and Reporting"}
              description={
                "Access detailed user-friendly analytics and reporting with a breakdown of your business performance all at your fingertios."
              }
            />
            <FeatureCard
              image={"./Dimension.png"}
              detail={"Scalability and Flexibility"}
              description={
                "Ketero ensures your business by providing a scalable and easily accessible platform for your entire team. "
              }
            />
            <FeatureCard
              image={"./perspective_matte.png "}
              detail={"Support and Maintenance"}
              description={
                "Just like our app. We offer 24/7 customer support to assist you anytime you need."
              }
            />
          </div>
        </section>
        <section className="s-4-payment">
          <div className="s-4-payment-wrapper">
            <PaymentCard list={list1} price={0} title={"Starter"} />
            <PaymentCard list={list2} price={999} title={"Basic"} />
            <PaymentCard list={list3} price={2999} title={"Pro"} />
          </div>
        </section>
        <section className="s-5-faq">
          <div className="container">
            <h2>FAQs</h2>
            <ul className="faq-lists">
              {FAQs.map((item) => {
                return <FaqCard key={item.answer} item={item} />;
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
