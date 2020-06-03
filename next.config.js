require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const path = require('path');
// const basePath = process.env.ENV != 'local' ? '/bang-hoi' : '';
const congif = process.env.ENV != 'local' ? 'alo' : 'ÁDAS';
const nextConfig = {
  // assetPrefix: basePath,
  // publicRuntimeConfig: {
  //   basePath: basePath,
  // },
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // custom alias
      components: path.join(__dirname, 'components'),
      containers: path.join(__dirname, 'containers'),
      actions: path.join(__dirname, 'actions'),
      reducers: path.join(__dirname, 'reducers'),
      sagas: path.join(__dirname, 'sagas'),
      services: path.join(__dirname, 'services'),
      utils: path.join(__dirname, 'utils'),
      hocs: path.join(__dirname, 'hocs'),
      styles: path.join(__dirname, 'styles'),
      configs: path.join(__dirname, 'configs'),
    };

    return config;
  },
 
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    ENV: process.env.ENV,
    CONFIG: 'ÁDASDAS'
  },
};

module.exports = withPlugins([withSass,withCSS,withImages, {}], nextConfig);
