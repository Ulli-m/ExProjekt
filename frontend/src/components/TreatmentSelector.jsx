import React from "react";

const TreatmentSelector = ({ behandlingar, selectedTreatment, onChange }) => {
  return (
    <div className="treatment-selector">
      {behandlingar.map((behandling) => (
        <label key={behandling.id}>
          <input
            type="radio"
            name="treatment"
            value={behandling.id}
            checked={selectedTreatment === behandling.id}
            onChange={(e) => onChange(e.target.value)}
          />
          {behandling.name}
        </label>
      ))}
    </div>
  );
};

export default TreatmentSelector;




