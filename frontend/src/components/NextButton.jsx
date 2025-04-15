import React from "react";
import "../styles/nextButton.css";

const NextButton = ({ onClick, disabled, label = "Fortsätt" }) => {
  return (
    <div className="next-button-container">
      <button
        onClick={onClick}
        disabled={disabled}
        className="next-button"
      >
        {label}
      </button>
    </div>
  );
};

export default NextButton;

