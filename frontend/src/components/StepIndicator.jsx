import React from "react";
import "../styles/stepindicator.css";

function StepIndicator({ currentStep, onStepClick }) {
  const steps = [1, 2, 3, 4, 5];
  const isDisabled = currentStep === 5;

  return (
    <div className="step-indicator">
      {steps.map((step) => {
        let className = "step-circle";
        if (step < currentStep) className += " completed";
        else if (step === currentStep) className += " current";

        const handleClick = () => {
          if (!isDisabled && step < 5 && step !== currentStep) {
            onStepClick(step);
          }
        };

        return (
          <div key={step} className="step-wrapper">
            <button
              className={className}
              onClick={handleClick}
              disabled={isDisabled || step === currentStep}
              title={`Steg ${step}`}
            >
              {step}
            </button>
            <span className="step-label">Steg {step}</span>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;

