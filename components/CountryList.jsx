import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../src/contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );

    const countries = cities.reduce((arr, city)=>{
        console.log(arr);
        
        if (!arr.map((el)=>el.country).includes(city.country))
            return [...arr, {country:city.country , emoji:city.emoji}]
        else return arr
    },[])

  return (
    <ul className={styles.countryList}>
      {countries.map((country,index) => {
        return <CountryItem country={country} key={index} />;
      })}
    </ul>
  );
};

export default CountryList;
