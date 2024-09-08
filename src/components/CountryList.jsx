// components
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

// context
import { useCities } from "../contexts/CitiesContext";

// styles
import styles from "./CountryList.module.css";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = new Set();
  cities.forEach((city) => {
    const country = JSON.stringify({
      country: city.country,
      emoji: city.emoji,
      id: city.id,
    });

    countries.add(country);
  });

  return (
    <ul className={styles.countryList}>
      {Array.from(countries).map((country) => {
        const count = JSON.parse(country);
        return <CountryItem country={count} key={count.id} />;
      })}
    </ul>
  );
}
