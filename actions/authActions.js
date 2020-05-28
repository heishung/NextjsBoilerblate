import {
  action,
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_USER_WITH_SSO,
  LOAD_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  LOGIN_FB,
} from './actionTypes';

export const loadUserWithSSO = (token, user, jwtToken) =>
  action(LOAD_USER_WITH_SSO, { token, user, jwtToken });

export const loadUser = {
  request: (token) => action(LOAD_USER[REQUEST], { token }),
  success: (user, jwtToken) => action(LOAD_USER[SUCCESS], { user, jwtToken }),
  failure: (error) => action(LOAD_USER[FAILURE], { error }),
};

export const login = {
  request: (username, password) => action(LOGIN[REQUEST], { username, password }),
  success: (token) => action(LOGIN[SUCCESS], { token }),
  failure: (error) => action(LOGIN[FAILURE], { error }),
};

export const register = {
  request: (email, username, password) => action(REGISTER[REQUEST], { email, username, password }),
  success: (token) => action(REGISTER[SUCCESS], { token }),
  failure: (error) => action(REGISTER[FAILURE], { error }),
};

export const loginFB = (token) => action(LOGIN_FB, { token });
export const logout = () => action(LOGOUT);
