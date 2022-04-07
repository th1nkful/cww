import supertest from 'supertest';
import nock from 'nock';
import getApp from '../src/express/app';

import zipResponse from './fixtures/zip.json';
import onceallResponse from './fixtures/onecall.json';
import airPollutionResp from './fixtures/air_pollution.json';

beforeEach(() => {
  nock.cleanAll();

  nock('http://api.openweathermap.org/data/2.5')
    .get('/air_pollution')
    .query(true)
    .reply(200, airPollutionResp);

  nock('http://api.openweathermap.org/data/2.5')
    .get('/onecall')
    .query(true)
    .reply(200, onceallResponse);

  nock('http://api.openweathermap.org/geo/1.0')
    .get('/zip')
    .query(true)
    .reply(200, zipResponse);
});

const getTestApi = () => {
  const app = getApp();
  return supertest(app);
};

describe('/api', () => {
  describe('GET /api/check-location', () => {
    it('rejects invalid params', async () => {
      const api = getTestApi();

      const result1 = await api.get('/api/check-location')
        .query({
          key: 'blah',
        });

      expect(result1.status).toBe(400);

      const result2 = await api.get('/api/check-location')
        .query({
          zip: [234, 456],
        });

      expect(result2.status).toBe(400);
    });

    it('returns location data', async () => {
      const api = getTestApi();

      const result1 = await api.get('/api/check-location')
        .query({
          zip: '4509',
        });

      expect(result1.status).toBe(200);
      expect(result1.body).toEqual(expect.objectContaining({
        location: zipResponse,
      }));
    });
  });

  describe('GET /api/weather', () => {
    it('rejects invalid params', async () => {
      const api = getTestApi();

      const result1 = await api.get('/api/weather')
        .query({
          key: 'blah',
        });

      expect(result1.status).toBe(400);

      const result2 = await api.get('/api/weather')
        .query({
          zip: [234, 456],
        });

      expect(result2.status).toBe(400);
    });

    it('returns weather data', async () => {
      const api = getTestApi();

      const result = await api.get('/api/weather')
        .query({
          zip: '4509',
        });

      expect(result.status).toBe(200);
      expect(result.body).toEqual(expect.objectContaining({
        weather: onceallResponse,
        airPollution: airPollutionResp,
        location: zipResponse,
      }));
    });
  });
});
