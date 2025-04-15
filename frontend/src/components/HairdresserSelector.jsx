import React from "react";

const HairdresserSelector = ({ frisorer, selectedHairdresser, onChange }) => {
  return (
    <div>
      <h2>Välj Frisör</h2>
      {frisorer && frisorer.length > 0 ? (
        <select
          value={selectedHairdresser || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Välj frisör --</option>
          {frisorer.map((frisor) => (
            <option key={frisor.id} value={frisor.id}>
              {frisor.namn}
            </option>
          ))}
        </select>
      ) : (
        <p>Inga frisörer tillgängliga</p>
      )}
    </div>
  );
};

export default HairdresserSelector;

