import React, { useState, useEffect } from "react";
import "../styles/bookingStep2.css";
import NextButton from "../components/NextButton";

const BookingStep2 = ({ treatment, hairdresser, onPrevious, onNext }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const startDate = getStartOfWeek(new Date(), weekOffset);

  useEffect(() => {
    if (treatment && hairdresser) {
      fetchAvailableTimes();
    }
  }, [treatment, hairdresser, weekOffset]);

  const fetchAvailableTimes = () => {
    // Här kan du byta ut till ett riktigt API-anrop i framtiden
    const simulatedData = generateDummyTimes(startDate);
    setAvailableTimes(simulatedData);
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

// Dummy-funktion som genererar lediga tider mellan 09:00–17:00
function generateDummyTimes(startDate) {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(startDate);
    current.setDate(current.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];

    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour}:00`);
    }

    result.push({ date: dateStr, times });
  }
  return result;
}


