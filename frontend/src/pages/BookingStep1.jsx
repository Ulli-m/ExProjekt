import React, { useState, useEffect } from "react";
import { fetchBehandlingar, fetchFrisorer } from "../utils/fetch";
import TreatmentSelector from "../components/TreatmentSelector";
import HairdresserSelector from "../components/HairdresserSelector";
import NextButton from "../components/NextButton";

const BookingStep1 = ({ treatment, hairdresser, onTreatmentChange, onHairdresserChange, onNext }) => {
  const [behandlingar, setBehandlingar] = useState([]);
  const [frisorer, setFrisorer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hämta data för behandlingar och frisörer
    Promise.all([fetchBehandlingar(), fetchFrisorer()])
      .then(([behandlingData, frisorData]) => {
        setBehandlingar(behandlingData || []);
        setFrisorer(frisorData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av data:", error);
        setLoading(false);
      });
  }, []);

  const handleTreatmentChange = (val) => {
    onTreatmentChange(val); // Uppdaterar treatment via onChange från parent
  };

  const handleHairdresserChange = (val) => {
    onHairdresserChange(val); // Uppdaterar frisör via onChange från parent
  };

  if (loading) {
    return <div>Laddar...</div>; // Visas medan data laddas
  }

  return (
    <div className="booking-step-1">
      <h1>Bokningssteg 1</h1>

      <h2>Välj behandling</h2>
      <TreatmentSelector
        behandlingar={behandlingar}
        selectedTreatment={treatment}
        onChange={handleTreatmentChange}
      />

      <h2>Välj frisör</h2>
      <HairdresserSelector
        frisorer={frisorer}
        selectedHairdresser={hairdresser}
        onChange={handleHairdresserChange}
      />

      {/* Aktivera knappen när både behandling och frisör är valda */}
      {treatment && hairdresser && (
        <NextButton onClick={onNext} label="Fortsätt" />
      )}
    </div>
  );
};

export default BookingStep1;

