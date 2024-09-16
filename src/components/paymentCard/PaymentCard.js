import React from "react";
import "./paymentCard.css";
function PaymentCard() {
  let list = [
    "40 Appointment/month",
    "Email Notification",
    "1 Service Type",
    "1 User",
    "iOS & Android App",
  ];

  return (
    <div className="wrapper">
      <div className="enter-wrapper">
        <div className="type">
          <h1>Starter</h1>
          <span>Plan</span>
        </div>
        <div className="subscription-container">
          <div className="price">
            <span>ETB</span>
            <span>999</span>
          </div>
          <div className="sub-plan">
            <span>/ Year</span>
          </div>
        </div>
      </div>
      <div className="lists-wrapper">
        <ul className="lists">
          {list.map((item) => {
            return (
              <>
                <li>
                  <span class="material-symbols-outlined">check</span>
                  {item}
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div className="trial-container">
        <a href="//"> start now</a>
        <span>7 days free trial</span>
      </div>
    </div>
  );
}

export default PaymentCard;
