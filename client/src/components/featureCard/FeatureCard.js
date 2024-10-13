import React from "react";
import "./featureCard.css";
function FeatureCard(props) {
  let { image, detail, description } = props;
  return (
    <div className="featureCard">
      <div className="featureCard-image">
        <img src={image} alt="" />
      </div>
      <div className="featureCard-detail">
        <h2>{detail}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
