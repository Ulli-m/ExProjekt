import React from "react";

const TreatmentSelector = ({ behandlingar, selectedTreatment, onChange }) => {
  return (
    <div>
      <h2>Välj Behandling</h2>
      {behandlingar && behandlingar.length > 0 ? (
        <select
          value={selectedTreatment || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Välj behandling --</option>
          {behandlingar.map((behandling) => (
            <option key={behandling.id} value={behandling.id}>
              {behandling.namn}
            </option>
          ))}
        </select>
      ) : (
        <p>Inga behandlingar tillgängliga</p>
      )}
    </div>
  );
};

export default TreatmentSelector;

