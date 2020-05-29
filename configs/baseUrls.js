// TODO: change to use .env file
const env = ['local', 'development', 'staging', 'production'].indexOf(process.env.ENV) > -1 ? process.env.ENV : 'development';

const baseUrls = {
  local: 'localhost:3001',
  development: 'https://dev-api.gamemate.fun',
  staging: 'https://stg-api.gamemate.fun',
  production: 'https://api.gamemate.fun',
};

const apiBaseUrls = {
  local: 'https://dev-api.gamemate.fun',
  development: 'https://dev-api.gamemate.fun',
  staging: 'https://stg-api.gamemate.fun',
  production: 'https://api.gamemate.fun',
};

const napBaseUrls = {
  local: 'localhost:3001',
  development: 'https://dev-api.gamemate.fun',
  staging: 'https://stg-api.gamemate.fun',
  production: 'https://api.gamemate.fun',
};

const playfunBaseUrls = {
  local: 'http://localhost:3000',
  development: 'https://dev-api.gamemate.fun',
  staging: 'https://stg-api.gamemate.fun',
  production: 'https://api.gamemate.fun',
};

const baseUrl = baseUrls[[env]];
const apiBaseUrl = apiBaseUrls[[env]];
const napBaseUrl = napBaseUrls[[env]];
const playfunBaseUrl = playfunBaseUrls[[env]];

export { baseUrl, apiBaseUrl, napBaseUrl, playfunBaseUrl };
