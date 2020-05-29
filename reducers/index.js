import { combineReducers } from 'redux';
import auth from './authReduces';
import alert from './alertReducers';

export default combineReducers({ auth, alert });
