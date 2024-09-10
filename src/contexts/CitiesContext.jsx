import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000/cities";

// create context
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: payload,
      };

    case "city/reset":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
      };

    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, payload],
        currentCity: payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

// create context provider
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    dispatch({ type: "loading" });
    getCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "city/reset" });
      try {
        const response = await fetch(`${BASE_URL}?id=${id}`);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data[0] });
      } catch (err) {
        dispatch({ type: "rejected", payload: "We don't find the city" });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data) dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "We don't find the city" });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/${cityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "cities/deleted", payload: cityId });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
