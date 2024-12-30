// WeatherData.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../services/firebase"; // Ensure you import from firebase.js

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const weatherRef = ref(database, "weather_data");

    const unsubscribe = onValue(weatherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWeatherData(Object.values(data));
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div>
      <h1>Weather Data</h1>
      <ul>
        {weatherData.map((item, index) => (
          <li key={index}>
            <strong>Day:</strong> {item.day} | <strong>Humidity:</strong>{" "}
            {item.humidity} | <strong>Temperature:</strong> {item.temperature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherData;
