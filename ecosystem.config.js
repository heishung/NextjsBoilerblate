module.exports = {
  apps: [
    {
      script: 'yarn',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'start',
      instances: 1,
      interpreter: '/bin/bash',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        args: 'start',
        name: 'bang-hoi-web',
        NODE_ENV: 'development',
      },
      env_development: {
        args: 'start-dev',
        name: 'bang-hoi-web-dev',
        NODE_ENV: 'development',
      },
      env_staging: {
        args: 'start-stg',
        name: 'bang-hoi-web-stg',
        NODE_ENV: 'staging',
      },
      env_production: {
        args: 'start-prod',
        name: 'bang-hoi-web-prod',
        max_memory_restart: '4G',
        NODE_ENV: 'production',
      },
    },
  ],
};
