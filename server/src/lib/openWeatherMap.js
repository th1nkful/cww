import axios from 'axios';
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor';

// the cache storage option here could be anything, just
// using memory for now to make this whole app simpler
// in dev that wouldn't be too helpful, could use redis
// or anything else you wanted to use to cache, which would
// depend on the deployed environment
//
// see https://axios-cache-interceptor.js.org/#/pages/storages?id=creating-your-own-storage
// for how to setup a custom storage type
const cacheStore = buildMemoryStorage();

const dataApi = setupCache(
  axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
      appid: process.env.OPENWEATHER_API_KEY,
    },
  }),
  {
    storage: cacheStore,
    ttl: 1000 * 60 * 5, // cache for 5 minutes
  },
);

const geoApi = setupCache(
  axios.create({
    baseURL: 'http://api.openweathermap.org/geo/1.0',
    params: {
      appid: process.env.OPENWEATHER_API_KEY,
    },
  }),
  {
    storage: cacheStore,
    ttl: 1000 * 60 * 5, // cache for 5 minutes
  },
);

/**
 * @param {string} zip
 * @param {string} [country]
 * @returns {Promise<{ name:string, lat:number, lon:number, state?:string }>}
 */
export const getZipCodeCoords = async (zip, country = 'AU') => {
  const { data } = await geoApi.get('/zip', {
    params: {
      zip: `${zip},${country}`,
      limit: 1,
    },
  });

  return data;
};

/**
 * @typedef {object} QualityItem
 * @property {number} dt
 * @property {object} main
 * @property {number} main.aqi
 * @property {object} components
 * @property {number} components.co
 * @property {number} components.no
 * @property {number} components.no2
 * @property {number} components.o3
 * @property {number} components.so2
 * @property {number} components.pm2_5
 * @property {number} components.pm10
 * @property {number} components.nh3
 */

/**
 * @param {string} zip
 * @param {string} [country]
 * @returns {Promise<{ coord: [number,number], list:QualityItem[] }>}
 */
export const getAirPollution = async (zip, country) => {
  const coords = await getZipCodeCoords(zip, country);

  const { data } = await dataApi.get('/air_pollution', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });

  return data;
};

/**
 * @typedef {object} OneCallResult
 * @property {number} lat
 * @property {number} lon
 * @property {string} timezone
 * @property {number} timezone_offset
 * @property {object} current
 * @property {string} current.dt
 * @property {string} current.sunrise
 * @property {string} current.sunset
 * @property {string} current.temp
 * @property {string} current.feels_like
 * @property {string} current.pressure
 * @property {string} current.humidity
 * @property {string} current.dew_point
 * @property {string} current.uvi
 * @property {string} current.clouds
 * @property {string} current.visibility
 * @property {string} current.wind_speed
 * @property {string} current.wind_deg
 * @property {{ id:number, main:string, description:string, icon:string }[]} current.weather
 */

/**
 * @param {string} zip
 * @param {string} [country]
 * @returns {Promise<OneCallResult>}
 */
export const getWeather = async (zip, country) => {
  const coords = await getZipCodeCoords(zip, country);

  const { data } = await dataApi.get('/onecall', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      units: 'metric',
      exclude: 'minutely,hourly,daily,alerts',
    },
  });

  return data;
};
