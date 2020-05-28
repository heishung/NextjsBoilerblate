import { callApi } from './api';
import signJWTToken from 'utils/signJWTToken';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { accessTokenKey, cookieDomain } from 'configs/cookies';

const getAccessToken = async (authorizationCode) => {
  try {
    const loadAccessTokenUrl = `/auth/get-access-token`;
    const { response } = await callApi(loadAccessTokenUrl, {
      method: 'POST',
      data: {
        authorization_code: authorizationCode,
      },
    });

    if (response.error) {
      throw response.message;
    }

    return { accessToken: response.data.access_token };
  } catch (error) {
    console.log(error, 'error when get access token');
    // TODO: why this not work???
    return { accessTokenError: error };
  }
};

const getUserInfo = async (token) => {
  try {
    const loadUserUrl = `/users/profile`;
    const { response, error } = await callApi(loadUserUrl, {
      headers: {
        'x-access-token': token,
      },
    });

    if (error) {
      throw error;
    }

    if (response.error) {
      throw response.message;
    }

    const user = response.data || {};
    return { user };
  } catch (error) {
    console.error(error, 'error when get user info');
    return { error };
  }
};

const authWithSSO = async (authorizationCode, token) => {
  try {
    if (token) {
      const { user, error } = await getUserInfo(token);

      if (error) {
        return { error };
      }

      const jwtToken = await signJWTToken(user);

      return {
        token,
        user,
        jwtToken,
      };
    }

    if (authorizationCode) {
      const { accessToken, accessTokenError } = await getAccessToken(authorizationCode);
      if (accessTokenError) {
        return { error: accessTokenError };
      }
      const { user, error } = await getUserInfo(accessToken);
      if (error) {
        return { error };
      }
      const jwtToken = await signJWTToken(user);

      return {
        token: accessToken,
        user,
        jwtToken,
      };
    }

    return false;
  } catch (error) {
    console.log(error, 'error with SSO');
    return {
      error: 'error with SSO',
    };
  }
};

export const setTokenToCookie = async (ctx, token) => {
  // Parse
  parseCookies(ctx);

  // Set
  setCookie(ctx, accessTokenKey, token, {
    domain: cookieDomain,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const removeTokenFromCookie = async (ctx) => {
  destroyCookie(ctx, accessTokenKey, {
    domain: cookieDomain,
  });
};

export default authWithSSO;
