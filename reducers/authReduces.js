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
    case LOGIN[REQUEST]:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FB:
      return {
        ...state,
      };
    case LOGIN[SUCCESS]:{
      const {token} = action.data
      console.log(action.data)
      return {
        ...state,
        user:action.data,
        token: token,
        isAuthenticated: true,
        loading: false,
      };
    }
    case REGISTER[SUCCESS]:{
      const {token} = action.data
      return {
        ...state,
        user:action.data,
        token: token,
        isAuthenticated: true,
        loading: false,
      };
    }
      
     
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
