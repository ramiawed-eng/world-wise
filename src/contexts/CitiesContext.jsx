import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

// create context
const CitiesContext = createContext();

// create context provider
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        setCities(data);
      } catch (err) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    getCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

// create useContext for cities context
function useCities() {
  const contenxt = useContext(CitiesContext);
  if (contenxt === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return contenxt;
}

export { CitiesProvider, useCities };
