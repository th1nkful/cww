import { Router } from 'express';
import * as Joi from 'joi';
import axios from 'axios';

import { createValidator } from 'express-joi-validation';
import { getAirPollution, getWeather, getZipCodeCoords } from '../lib/openWeatherMap';
import log from '../log';

const router = Router();
const validator = createValidator();

router.get('/check-location',
  validator.query(Joi.object({
    zip: Joi.string().required(),
    country: Joi.string(),
  })),
  async (req, res, next) => {
    try {
      const { zip, country } = req.query;
      const location = await getZipCodeCoords(zip, country);

      res.json({ location });
    } catch (error) {
      // If its a axios error, dont log the whole error
      // to avoid leaking API credentials into logs
      if (axios.isAxiosError(error)) {
        log.error({
          errorUrl: error.config?.url,
          errorData: error.response?.data,
        });
      } else {
        log.error(error);
      }

      // make sure the express default error handler picks this up
      // could wrap in utility to handle async routes
      next(error);
    }
  });

router.get('/weather',
  validator.query(Joi.object({
    zip: Joi.string().required(),
    country: Joi.string(),
  })),
  async (req, res, next) => {
    try {
      const { zip, country } = req.query;

      // we could use Promise.all to run at the same time but
      // want to avoid hitting the API too hard (theoretically)
      // and make sure the cache can be used for the location on
      // the second/third call too
      const location = await getZipCodeCoords(zip, country);

      // could swap these two to use lat/lon that already exists
      // but simpler atm to leave it as it is
      const airPollution = await getAirPollution(zip, country);
      const weather = await getWeather(zip, country);

      res.json({ location, airPollution, weather });
    } catch (error) {
      // If its a axios error, dont log the whole error
      // to avoid leaking API credentials into logs
      if (axios.isAxiosError(error)) {
        log.error({
          errorUrl: error.config?.url,
          errorData: error.response?.data,
        });
      } else {
        log.error(error);
      }

      // make sure the express default error handler picks this up
      // could wrap in utility to handle async routes
      next(error);
    }
  });

export default router;
