// make sure we don't use the real OpenWeather key during tests
process.env.OPENWEATHER_API_KEY = 'xxxxx';

module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules'],
};
