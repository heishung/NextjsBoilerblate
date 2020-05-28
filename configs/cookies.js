const env = ['local', 'development', 'staging', 'production'].indexOf(process.env.ENV) > -1 ? process.env.ENV : 'development';

const accessTokenKeys = {
  local: '_l_actk',
  development: '_d_actk',
  staging: '_s_actk',
  production: '_p_actk',
};

const cookieDomains = {
  local: 'localhost',
  development: 'playfun.vn',
  staging: 'playfun.vn',
  production: 'playfun.vn',
};

export const accessTokenKey = accessTokenKeys[[env]];
export const cookieDomain = cookieDomains[[env]];
