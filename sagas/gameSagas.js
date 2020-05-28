import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { callApi } from 'services/api';

import { getGames } from 'actions/gameActions';
import { authSelector, gameSelector } from 'reducers/selectors';
import { REQUEST, GET_GAMES } from 'actions/actionTypes';

export function* getGamesSaga(action) {
  try {
    // TODO: remove this when we can set default header axios on client
    const { token, jwtToken } = yield select(authSelector);
    const { games } = yield select(gameSelector);
    // TODO: change the way limit call service
    const getGamesUrl = `/games-have-guild`;
    const { response, error } = yield call(callApi, getGamesUrl, {
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }
    yield put(getGames.success(response.data || []));
  } catch (error) {
    console.error(error);
    yield put(getGames.failure(error));
  }
}

export default function* rootSaga() {
  yield all([yield takeLatest(GET_GAMES[REQUEST], getGamesSaga)]);
}
