import React, { useState, useEffect } from 'react';
import { fetchBehandlingar, fetchFrisorer } from '../utils/fetch';
import TreatmentSelector from '../components/TreatmentSelector';
import HairdresserSelector from '../components/HairdresserSelector';
import NextButton from '../components/NextButton';

const BookingStep1 = ({
  treatment,
  hairdresser,
  onTreatmentChange,
  onHairdresserChange,
  onNext
}) => {
  const [behandlingar, setBehandlingar] = useState([]);
  const [frisorer, setFrisorer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBehandlingar(), fetchFrisorer()])
      .then(([behandlingData, frisorData]) => {
        setBehandlingar(behandlingData || []);
        setFrisorer(frisorData || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laddar...</div>;

  return (
    <div>
      <h1>Bokningssteg 1</h1>

      <TreatmentSelector
        behandlingar={behandlingar}
        selectedTreatment={treatment}
        onChange={onTreatmentChange}
      />

      <HairdresserSelector
        frisorer={frisorer}
        selectedHairdresser={hairdresser}
        onChange={onHairdresserChange}
      />

      {treatment && hairdresser && (
        <NextButton onClick={onNext} label="Fortsätt" />
      )}
    </div>
  );
};

export default BookingStep1;

