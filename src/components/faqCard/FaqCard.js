import React from "react";
import "./faqCard.css";
function FaqCard({ item }) {
  let toggle = (e) => {
    console.log(e.target.parentElement.classList.toggle("active"));
  };
  return (
    <li>
      <label className="question" onClick={toggle}>
        {item.question}
      </label>
      <label className="answer" onClick={toggle}>
        {item.answer}
      </label>
    </li>
  );
}

export default FaqCard;
