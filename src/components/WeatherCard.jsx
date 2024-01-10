import React from "react";

class WeatherCard extends React.Component {
  formatDay = (dateStr) => {
    if (
      new Date(dateStr).toLocaleDateString() === new Date().toLocaleDateString()
    )
      return "TODAY";

    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  };

  getWeatherIcon = (wmoCode) => {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  };

  render() {
    const { minTemp, maxTemp, date, code } = this.props;

    return (
      <li className="day">
        <span>{this.getWeatherIcon(code)}</span>

        <p>{this.formatDay(date)}</p>

        <p>
          {Math.round(minTemp)}&deg; &mdash;{" "}
          <strong>{Math.round(maxTemp)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default WeatherCard;
