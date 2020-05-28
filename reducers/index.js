import { combineReducers } from 'redux';
import auth from './authReduces';
import game from './gameReduces';
import guild from './guildReduces';
import gift from './giftReduces';
import alert from './alertReducers';

export default combineReducers({ auth, game, guild, gift, alert });
