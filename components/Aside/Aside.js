import { useEffect, useState } from "react";
import { MdMyLocation, MdLocationOn } from "react-icons/md";
import styles from "./Aside.module.css";
const Aside = ({ data, city, setCity, setToday, setOtherDays }) => {
  const [img, setImg] = useState("/images/HeavyCloud.png");
  const [searchedCities, setSearchedCities] = useState([]);
  useEffect(() => {
    switch (data.weather_state_name) {
      case "Clear":
        setImg("/images/Clear.png");
        break;
      case "Light Cloud":
        setImg("/images/LightCloud.png");
        break;
      case "Showers":
        setImg("/images/Shower.png");
        break;
      case "Snow":
        setImg("/images/Snow.png");
        break;
      case "Heavy Rain":
        setImg("/images/HeavyRain.png");
        break;
      case "Thunderstorm":
        setImg("/images/Thunderstorm.png");
        break;
      case "Light Rain":
        setImg("/images/LightRain.png");
        break;
      default:
        setImg("/images/LightCloud.png");
    }
  }, [data]);
  // useEffect(()=>{
  //   switch(data.){

  //   }
  // },[data])
  return (
    <div className={styles.aside}>
      <div>
        <button
          onClick={(e) => {
            document.getElementById("menu").style.left = "0";
          }}
        >
          Search for places
        </button>
        <div className={styles.locationIconDiv}>
          <MdMyLocation />
        </div>
      </div>
      <div>
        <img src={img} alt="shower" />
      </div>
      <div>
        {data.the_temp && data.the_temp.toFixed(0)}
        <span>°C</span>
      </div>
      <div>{data.weather_state_name}</div>
      <div>
        <div>{data.applicable_date}</div>
        <div>
          <MdLocationOn className={styles.locationBottom} /> <span>{city}</span>
        </div>
      </div>
      <img
        className={styles.backgroundCloud1}
        src="/images/HeavyCloud.png"
        alt="heavy cloud"
      />
      <img
        className={styles.backgroundCloud2}
        src="/images/HeavyCloud.png"
        alt="heavy cloud"
      />
      <img
        className={styles.backgroundCloud3}
        src="/images/HeavyCloud.png"
        alt="heavy cloud"
      />
      <img
        className={styles.backgroundCloud4}
        src="/images/HeavyCloud.png"
        alt="heavy cloud"
      />
      <div id="menu" className={styles.menu}>
        <div
          onClick={(e) => {
            e.target.parentElement.style.left = "-460px";
          }}
        >
          X
        </div>
        <div>
          <input
            id="search-input"
            onChange={(e) => {
              fetch(
                `https://www.metaweather.com/api/location/search/?query=${e.target.value}`
              )
                .then((res) => res.json())
                .then((res) => setSearchedCities(res));
              if (e.target.value === "" || undefined || null) {
                setSearchedCities([]);
              }
            }}
            placeholder="Search location"
            type="text"
          />
          <button>Search</button>
        </div>
        <div>
          {searchedCities.map((city, index) => {
            return (
              <p
                key={index}
                className={styles.searchedP}
                onClick={() => {
                  fetch(
                    `https://www.metaweather.com/api/location/${city.woeid}/`
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res.consolidated_weather[4]);
                      setCity(res.title);
                      setToday(res.consolidated_weather[0]);
                      setOtherDays(res.consolidated_weather.splice(1));
                      setSearchedCities([]);
                      document.getElementById("search-input").value = "";
                      document.getElementById("menu").style.left = "-460px";
                    });
                }}
              >
                {city.title}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Aside;
