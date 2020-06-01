export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const OPEN_MODAL ='OPEN_MODAL'
export const CLOSE_MODAL ='CLOSE_MODAL'

export const GENERATE_ALERT = 'GENERATE_ALERT';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const LOAD_USER = createRequestTypes('LOAD_USER');
export const LOAD_USER_WITH_SSO = createRequestTypes('LOAD_USER_WITH_SSO');
export const LOGIN = createRequestTypes('LOGIN');
export const REGISTER = createRequestTypes('REGISTER');

export const LOGIN_FB = 'LOGIN_FB';
export const LOGOUT = 'LOGOUT';

export const GET_GAMES = createRequestTypes('GET_GAMES');

export const CREATE_GUILD = createRequestTypes('CREATE_GUILD');
export const UPDATE_GUILD = createRequestTypes('UPDATE_GUILD');
export const CLOSE_GUILD = createRequestTypes('CLOSE_GUILD');
export const RESET_CREATED_GUILD = 'RESET_CREATED_GUILD';

export const GET_GUILD = createRequestTypes('GET_GUILD');
export const GET_GUILDS_IN_GAME = createRequestTypes('GET_GUILDS_IN_GAME');
export const GET_GUILDS_BY_USER = createRequestTypes('GET_GUILDS_BY_USER');

export const REQUEST_JOIN = createRequestTypes('REQUEST_JOIN');
export const CANCEL_JOIN = createRequestTypes('CANCEL_JOIN');
export const ACCEPT_JOIN = createRequestTypes('ACCEPT_JOIN');
export const REJECT_JOIN = createRequestTypes('REJECT_JOIN');
export const RESET_SEND_REQUEST_JOIN_STATUS = 'RESET_SEND_REQUEST_JOIN_STATUS';
export const RESET_RESULT_STATUS = 'RESET_RESULT_STATUS';
export const RESET_ERROR = 'RESET_ERROR';
export const SET_SHOW_JOINED_TAB = 'SET_SHOW_JOINED_TAB';

export const GET_GIFTS = createRequestTypes('GET_GIFTS');
export const TAKE_GIFT = 'TAKE_GIFT';
