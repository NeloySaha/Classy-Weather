import React from "react";
import WeatherCard from "./WeatherCard";

class Weather extends React.Component {
  // useEffect cleanup function
  componentWillUnmount() {
    console.log("I am unmounting bro");
  }

  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    const weatherCards = codes?.map((code, i) => {
      return (
        <WeatherCard
          key={i}
          minTemp={min[i]}
          maxTemp={max[i]}
          date={dates[i]}
          code={code}
        />
      );
    });

    return <ul className="weather">{weatherCards}</ul>;
  }
}

export default Weather;
