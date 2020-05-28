// TODO: change to use .env file
const env = ['local', 'development', 'staging', 'production'].indexOf(process.env.ENV) > -1 ? process.env.ENV : 'development';

const baseUrls = {
  local: 'localhost:3001',
  development: 'dev-banghoi.playfun.vn',
  staging: 'stg-banghoi.playfun.vn',
  production: 'banghoi.playfun.vn',
};

const apiBaseUrls = {
  local: 'http://localhost:5001',
  development: 'https://dev-api.playfun.vn/guild',
  staging: 'https://stg-api.playfun.vn/guild',
  production: 'https://api.playfun.vn/guild',
};

const napBaseUrls = {
  local: 'https://dev-nap.funtap.vn',
  development: 'https://dev-nap.funtap.vn',
  staging: 'https://stg-nap.funtap.vn',
  production: 'https://nap.funtap.vn',
};

const playfunBaseUrls = {
  local: 'http://localhost:3000',
  development: 'https://dev.playfun.vn',
  staging: 'https://stg.playfun.vn',
  production: 'https://playfun.vn',
};

const baseUrl = baseUrls[[env]];
const apiBaseUrl = apiBaseUrls[[env]];
const napBaseUrl = napBaseUrls[[env]];
const playfunBaseUrl = playfunBaseUrls[[env]];

export { baseUrl, apiBaseUrl, napBaseUrl, playfunBaseUrl };
