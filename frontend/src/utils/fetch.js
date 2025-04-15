/*const apiUrl = 'http://localhost/backend/src/Databashantering'; // Ange korrekt API URL*/
const apiUrl = 'http://localhost:8080/Databashantering';

// Hämta behandlingar
export const fetchBehandlingar = async () => {
  try {
    const response = await fetch(`${apiUrl}/getBehandlingar.php`);
    if (!response.ok) {
      throw new Error('Något gick fel vid hämtning av behandlingar');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

console.log('http://localhost:8080/Databashantering/getBehandlingar.php');

// Hämta frisörer
export const fetchFrisorer = async () => {
  try {
    const response = await fetch(`${apiUrl}/getFrisorer.php`);
    if (!response.ok) {
      throw new Error('Något gick fel vid hämtning av frisörer');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

