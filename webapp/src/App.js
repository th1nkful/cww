import React from 'react';

import './App.css';
import DifferenceWidget from './components/DifferenceWidget';
import WeatherWidget from './components/WeatherWidget';

const defaultLocations = {
  a: {
    timezone: null,
    zip: '4000',
  },
  b: {
    timezone: null,
    zip: '6000',
  },
};

const App = () => {
  const [timezoneA, setTimezoneA] = React.useState(defaultLocations.a.timezone);
  const [timezoneB, setTimezoneB] = React.useState(defaultLocations.b.timezone);

  return (
    <div className="app">
      <div className="container">
        <div className="weather-widgets">
          <WeatherWidget
            defaultLocation={defaultLocations.a.zip}
            setTimezone={setTimezoneA}
          />
          <WeatherWidget
            defaultLocation={defaultLocations.b.zip}
            setTimezone={setTimezoneB}
          />
        </div>
        <div className="difference-widget-container">
          <DifferenceWidget
            timezoneA={timezoneA}
            timezoneB={timezoneB}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
