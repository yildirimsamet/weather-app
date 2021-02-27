import { useEffect, useState } from "react";
import styles from "./SingleDay.module.css";
const SingleDay = ({ data, index }) => {
  const [img, setImg] = useState("/images/HeavyCloud.png");
  useEffect(() => {
    switch (data.weather_state_name) {
      case "Clear":
        setImg("/images/Clear.png");
        break;
      case "LightCloud":
        setImg("/images/LightCloud.png");
        break;
      case "Showers":
        setImg("/images/Shower.png");
        break;
      case "Snow":
        setImg("/images/Snow.png");
        break;
      case "HeavyRain":
        setImg("/images/HeavyRain.png");
        break;
      default:
        setImg("/images/LightCloud.png");
    }
  }, [data]);
  return (
    <div className={styles.singleDayWrapper}>
      <div>
        {index === 0
          ? "Tomorrow"
          : data.applicable_date.substring(5, data.applicable_date.length)}
      </div>
      <img src={img} alt="weather icon" />
      <div>
        <span>{data.max_temp.toFixed(0)}°C</span>
        <span>{data.min_temp.toFixed(0)}°C</span>
      </div>
    </div>
  );
};
export default SingleDay;
