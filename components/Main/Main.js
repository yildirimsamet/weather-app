import styles from "./Main.module.css";
import SingleDay from "../SingleDay/SingleDay";
import { FaLocationArrow } from "react-icons/fa";
const Main = ({ data, today }) => {
  return (
    <div className={styles.main}>
      <div className={styles.mainTop}>
        <span className={styles.active}>°C</span>
        <span>°F</span>
      </div>
      <div className={styles.mainMid}>
        {data.map((day, index) => {
          return <SingleDay index={index} key={index} data={day} />;
        })}
      </div>
      <div className={styles.mainBot}>
        <h2>Today's Highlights</h2>
        <div className={styles.mainBotCardsWrapper}>
          <div className={styles.mainBotBigCard}>
            <h3>Wind status</h3>
            <p className={styles.mainBotCardMid}>
              {today.wind_speed && today.wind_speed.toFixed(0)}
              <span>mph</span>
            </p>
            <p className={styles.mainBotCardBot}>
              <FaLocationArrow
                style={{
                  transform: `rotate(${
                    today.wind_direction && today.wind_direction.toFixed(0) - 45
                  }deg)`,
                }}
                className={styles.iconDirection}
              />{" "}
              WSW
            </p>
          </div>
          <div className={styles.mainBotBigCard}>
            <h3>Humidity</h3>
            <p className={styles.mainBotCardMid}>
              {today.humidity}
              <span>%</span>
            </p>
            <div className={styles.progressNumbers}>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className={styles.mainBotCardProgress}>
              <span
                style={{ width: `${today.humidity}` + "%" }}
                className={styles.mainBotCardProgresser}
              ></span>
            </div>
          </div>
          <div className={styles.mainBotSmallCard}>
            <h3>Visibility</h3>
            <p>
              {today.visibility && today.visibility.toFixed(1)}{" "}
              <span>miles</span>
            </p>
          </div>
          <div className={styles.mainBotSmallCard}>
            <h3>Air Pressure</h3>
            <p>
              {today.air_pressure} <span>mb</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
