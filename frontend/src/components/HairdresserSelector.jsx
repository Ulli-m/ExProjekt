import React from "react";

const HairdresserSelector = ({ frisorer, selectedHairdresser, onChange }) => {
  return (
    <div className="hairdresser-selector">
      <select value={selectedHairdresser} onChange={(e) => onChange(e.target.value)}>
        {frisorer.map((frisor) => (
          <option key={frisor.id} value={frisor.id}>
            {frisor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HairdresserSelector;



