import {
  REQUEST,
  SUCCESS,
  FAILURE,
  LOGOUT,
  LOAD_USER_WITH_SSO,
  LOAD_USER,
  LOGIN,
  REGISTER,
  LOGIN_FB,
} from 'actions/actionTypes';

import Authentication from 'utils/authentication';
const initialState = {
  token: null,
  jwtToken: null,
  isAuthenticated: false,
  loading: false,
  errors: [],
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_WITH_SSO:
      return {
        ...state,
        token: action.token,
        user: { ...action.user },
        jwtToken: action.jwtToken,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_USER[REQUEST]:
      return {
        ...state,
        token: action.token,
        loading: true,
      };
    case LOAD_USER[SUCCESS]:
      return {
        ...state,
        user: { ...action.user },
        jwtToken: action.jwtToken,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN[REQUEST]:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FB:
      return {
        ...state,
      };
    case LOGIN[SUCCESS]:
    case REGISTER[SUCCESS]:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER[REQUEST]:
      return {
        ...state,
        loading: true,
      };

    case REGISTER[FAILURE]:
    case LOGIN[FAILURE]:
      alert(action.error);
      return {
        ...state,
      };
    case LOAD_USER[FAILURE]:
    case LOGOUT:
      return {
        ...state,
        jwtToken: null,
        token: null,
        isAuthenticated: false,
        errors: [action.error],
        loading: false,
      };
    default:
      return state;
  }
}
