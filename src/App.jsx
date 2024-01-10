import React from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";

class App extends React.Component {
  // JS feature
  state = {
    location: localStorage.getItem("location") || "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  convertToFlag = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  fetchWeatherData = async () => {
    if (this.state.location.length < 3) return;

    try {
      // 1) Getting location (geocoding)
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      this.setState({
        displayLocation: `${name} ${this.convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();

      this.setState({
        weather: weatherData.daily,
      });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  // Lifecyle methods
  // useEffect(,[])
  componentDidMount() {
    this.fetchWeatherData();
  }

  // useEffect(,[dependancy,here it is location])
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeatherData();

      localStorage.setItem("location", this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>

        <Input
          location={this.state.location}
          handleLocationChange={this.handleLocationChange}
        />

        {this.state.isLoading && <p className="loader">Loading...</p>}

        {this.state.location && (
          <h2>Weather for {this.state.displayLocation}</h2>
        )}

        {this.state.location && this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
