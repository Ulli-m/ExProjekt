import React, { useState, useEffect } from 'react';
import { fetchBehandlingar, fetchFrisorer } from '../utils/fetch'; // Importera fetch-funktionerna

const BookingStep1 = () => {
  const [behandlingar, setBehandlingar] = useState([]);
  const [frisorer, setFrisorer] = useState([]);
  const [loading, setLoading] = useState(true); // Lägg till en loading state

  useEffect(() => {
    // Hämta behandlingar
    fetchBehandlingar()
      .then((data) => {
        setBehandlingar(data);
      })
      .finally(() => setLoading(false)); // När datan är hämtad, sätt loading till false
    
    // Hämta frisörer
    fetchFrisorer()
      .then((data) => setFrisorer(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Laddar...</div>; // Visa laddningstext om datan hämtas
  }

  return (
    <div>
      <h1>Bokningssteg 1</h1>
      
      <div>
        <h2>Välj Behandling</h2>
        {/* Kontrollera om behandlingar finns innan du försöker mapa över dem */}
        {behandlingar && behandlingar.length > 0 ? (
          <select>
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
      
      <div>
        <h2>Välj Frisör</h2>
        {/* Kontrollera om frisörer finns innan du försöker mapa över dem */}
        {frisorer && frisorer.length > 0 ? (
          <select>
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
    </div>
  );
};

export default BookingStep1;


