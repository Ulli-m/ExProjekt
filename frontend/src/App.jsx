import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroImage from "./components/HeroImage";
import StepIndicator from "./components/StepIndicator";
import BookingStep1 from "./pages/BookingStep1";


function App() {
  const [step, setStep] = useState(1);  // Spårar vilket steg användaren är på
  const [treatment, setTreatment] = useState(null);
  const [hairdresser, setHairdresser] = useState(null);

  const handleTreatmentChange = (treatment) => setTreatment(treatment);
  const handleHairdresserChange = (hairdresser) => setHairdresser(hairdresser);

  const goToNextStep = () => {
    setStep((prevStep) => (prevStep < 5 ? prevStep + 1 : prevStep));  // Går till nästa steg
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));  // Går till föregående steg
  };

  return (
    <>
      <Header />
      <main>
        <HeroImage />
        <StepIndicator currentStep={step} />
        {step === 1 && (
          <BookingStep1
            treatment={treatment}
            hairdresser={hairdresser}
            onTreatmentChange={handleTreatmentChange}
            onHairdresserChange={handleHairdresserChange}
            onNext={goToNextStep}
          />
        )}
        {step === 2 && <BookingStep2 onPrevious={goToPreviousStep} onNext={goToNextStep} />}
        {/* Lägg till fler steg här */}
      </main>
      <Footer />
    </>
  );
}

export default App;
