import { all } from 'redux-saga/effects';

import LoginSagas from './loginSagas';
import AlertSagas from './alertSagas';

export default function* rootSaga() {
  yield all([AlertSagas(),LoginSagas()]);
}
