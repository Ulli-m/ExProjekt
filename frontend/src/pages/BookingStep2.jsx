import React, { useState, useEffect } from "react";
import "../styles/bookingStep2.css";
import NextButton from "../components/NextButton";
import { fetchLedigaTider } from "../utils/fetch";

const BookingStep2 = ({ treatment, hairdresser, onPrevious, onNext }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const startDate = getStartOfWeek(new Date(), weekOffset);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  useEffect(() => {
    if (treatment && hairdresser) {
      fetchAvailableTimes();
    }
  }, [treatment, hairdresser, weekOffset]);

  const fetchAvailableTimes = async () => {
    try {
      const times = await fetchLedigaTider(
        hairdresser.id,
        treatment.id,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );
      setAvailableTimes(times);
    } catch (err) {
      console.error("Kunde inte hämta tider", err);
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="booking-step-2">
      <h2>Välj tid</h2>

      <div className="week-navigation">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>Tillbaka</button>
        <span>Vecka som börjar {startDate.toLocaleDateString("sv-SE")}</span>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>Fram</button>
      </div>

      <div className="calendar-grid">
        {availableTimes.map((day) => (
          <div key={day.date} className="day-column">
            <div className="day-header">
              {new Date(day.date).toLocaleDateString("sv-SE", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
              })}
            </div>
            {day.times.map((time) => {
              const slotKey = `${day.date}-${time}`;
              const isSelected = selectedSlot === slotKey;
              return (
                <button
                  key={slotKey}
                  className={`time-slot ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectSlot(slotKey)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="step-buttons">
        <button onClick={onPrevious}>Tillbaka</button>
        <NextButton onClick={onNext} disabled={!selectedSlot} />
      </div>
    </div>
  );
};

export default BookingStep2;

// Hjälpfunktion: Få måndagen för veckan med offset
function getStartOfWeek(date, offset = 0) {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay(); // Söndag = 7
  d.setDate(d.getDate() - day + 1 + offset * 7); // Måndag = start
  return d;
}




