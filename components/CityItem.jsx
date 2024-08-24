import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../src/contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, handleDeleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleClick = (e) => {
    e.preventDefault();
    handleDeleteCity(id)
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
