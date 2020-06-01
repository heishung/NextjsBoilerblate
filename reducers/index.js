import { combineReducers } from 'redux';
import auth from './authReduces';
import alert from './alertReducers';
import modal from './modalReduces'
export default combineReducers({ auth, alert,modal });
