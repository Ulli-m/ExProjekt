// App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroImage from "./components/HeroImage";
import StepIndicator from "./components/StepIndicator";
import BookingStep1 from "./pages/BookingStep1";
import BookingStep2 from "./pages/BookingStep2";

function App() {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(null);
  const [hairdresser, setHairdresser] = useState(null);

  const handleTreatmentChange = (selectedTreatment) => {
    setTreatment(selectedTreatment);
  };

  const handleHairdresserChange = (selectedHairdresser) => {
    setHairdresser(selectedHairdresser);
  };

  const goToNextStep = () => {
    setStep((prev) => (prev < 5 ? prev + 1 : prev));
  };

  const goToPreviousStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <Header />
      <main>
        <HeroImage />
        <StepIndicator currentStep={step} onStepClick={(val) => setStep(val)} />

        {step === 1 && (
          <BookingStep1
            treatment={treatment}
            hairdresser={hairdresser}
            onTreatmentChange={handleTreatmentChange}
            onHairdresserChange={handleHairdresserChange}
            onNext={goToNextStep}
          />
        )}

        {step === 2 && (
          <BookingStep2
            treatment={treatment}
            hairdresser={hairdresser}
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;

