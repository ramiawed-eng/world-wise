// components
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList({ cities, isLoading }) {
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
