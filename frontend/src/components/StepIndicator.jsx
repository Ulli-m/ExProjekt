import React from "react";
import "../styles/stepindicator.css";

function StepIndicator({ currentStep }) {
  const steps = [1, 2, 3, 4, 5];  // De olika stegen i processen

  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div
          key={step}
          className={`step ${currentStep >= step ? "active" : ""}`}
        >
          Steg {step}
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
