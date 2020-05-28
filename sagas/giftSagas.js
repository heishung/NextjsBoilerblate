import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { callApi } from 'services/api';

import { getGifts } from 'actions/giftActions';
import { authSelector } from 'reducers/selectors';
import { REQUEST, GET_GIFTS } from 'actions/actionTypes';

export function* getGiftsSaga(action) {
  try {
    const { gameID, guildID } = action;
    // TODO: remove this when we can set default header axios on client
    const { token, jwtToken } = yield select(authSelector);
    // TODO: change the way limit call service
    const getGiftsEndpoint = `/events/guild?game_id=${gameID}&guild_id=${guildID}&page=1&limit=10`;
    const { response, error } = yield call(callApi, getGiftsEndpoint, {
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }
    yield put(getGifts.success(response.data || []));
  } catch (error) {
    console.error(error);
    yield put(getGifts.failure(error));
  }
}

export default function* rootSaga() {
  yield all([yield takeLatest(GET_GIFTS[REQUEST], getGiftsSaga)]);
}
