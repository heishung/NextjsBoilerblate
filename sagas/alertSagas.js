import { put, takeLatest, all } from 'redux-saga/effects';
import uuid from 'react-uuid';

import { alert } from 'actions/alertActions';
import { GENERATE_ALERT } from 'actions/actionTypes';

export function* generateAlertSaga(action) {
  const id = uuid();
  const { msg, alertType } = action;

  yield put(alert.set(msg, alertType, id));

  setTimeout(() => put(alert.remove(id)), 5000);
}

export default function* rootSaga() {
  yield all([yield takeLatest(GENERATE_ALERT, generateAlertSaga)]);
}
