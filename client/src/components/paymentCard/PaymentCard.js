import React from "react";
import "./paymentCard.css";
function PaymentCard(props) {
  let { list, title, price } = props;

  return (
    <div className="wrapper">
      <div className="enter-wrapper">
        <div className="type">
          <h1>{title}</h1>
          <span>Plan</span>
        </div>
        <div className="subscription-container">
          <div className="price">
            <span>ETB</span>
            <span>{price}</span>
          </div>
          <div className="sub-plan">
            <span>/ Year</span>
          </div>
        </div>
      </div>
      <div className="trial-container">
        <a href="//">start now</a>
        <span>7 days free trial</span>
      </div>
      <div className="lists-wrapper">
        <ul className="lists">
          {list.map((item) => {
            return (
              <li key={item}>
                <span className="material-symbols-outlined">check</span>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PaymentCard;
