import { all } from 'redux-saga/effects';

import GameSagas from './gameSagas';
import GuildSagas from './guildSagas';
import GiftSagas from './giftSagas';
import AlertSagas from './alertSagas';

export default function* rootSaga() {
  yield all([GameSagas(), GuildSagas(), GiftSagas(), AlertSagas()]);
}
