import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Aside from "../components/Aside/Aside";
import Main from "../components/Main/Main";

export default function Home() {
  const [today, setToday] = useState([]);
  const [otherDays, setOtherDays] = useState([]);
  const [city, setCity] = useState("");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  async function showPosition(position) {
    fetch(process.env.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetch(process.env.API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://www.metaweather.com/api/location/${res.data[0].woeid}/`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setCity(res.data.title);
            setToday(res.data.consolidated_weather[0]);
            setOtherDays(res.data.consolidated_weather.splice(1));
          });
      });
  }
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Aside
        setCity={setCity}
        setToday={setToday}
        setOtherDays={setOtherDays}
        city={city}
        data={today}
      />
      <Main today={today} data={otherDays} />
    </div>
  );
}
