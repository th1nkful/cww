import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { get } from 'lodash';
import WeatherIcon from 'react-open-weather-icons';

const WeatherWidget = ({
  defaultLocation,
  setTimezone,
}) => {
  // const [location, setLocation] = React.useState(defaultLocation);
  const location = defaultLocation;

  const [details, setDetails] = React.useState();

  React.useEffect(() => {
    const getWeatherDetails = async () => {
      const { data } = await axios.get('/api/weather', {
        params: {
          zip: location,
        },
      });

      setTimezone(data.weather);
      setDetails(data);

      console.log(data);
    };

    if (location) {
      getWeatherDetails();
    }
  }, [location, setTimezone]);

  if (!details) {
    return (
      <div className="weather-widget">
        <h3 className="secondary">Location loading...</h3>
      </div>
    );
  }

  const aqi = get(details, 'airPollution.list.0.main.aqi');
  const weather = get(details, 'weather.current');
  const condition = get(details, 'weather.current.weather.0', {});

  return (
    <div className="weather-widget">
      <div>
        <WeatherIcon name={condition.icon} className="weather-icon" />
        <h1 className="location-name">{details.location?.name}</h1>
        <h3 className="location-zip">{location}</h3>
      </div>
      <hr />
      <div style={{ marginTop: 24 }}>
        <p className="value">{`${weather.temp}°`}</p>
        <h5 className="value-heading">Temp</h5>
        <p className="value">{`${weather.feels_like}°`}</p>
        <h5 className="value-heading">Feels Like</h5>
        <p className="value">{`${weather.humidity}%`}</p>
        <h5 className="value-heading">Humidity</h5>
        <p className="value">{`${condition.main}%`}</p>
        <h5 className="value-heading">Conditions</h5>
      </div>
      <div>
        <p className="value">{aqi}</p>
        <h5 className="value-heading">Air Quality</h5>
      </div>
    </div>
  );
};

WeatherWidget.propTypes = {
  defaultLocation: PropTypes.string.isRequired,
  setTimezone: PropTypes.func.isRequired,
};

export default WeatherWidget;
