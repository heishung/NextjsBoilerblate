import Router from 'next/router';
import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { callApi } from 'services/api';

import {
  createGuild,
  updateGuild,
  getGuild,
  getGuildsInGame,
  getGuildsByUser,
  requestJoinGuild,
  cancelJoinGuild,
  acceptJoinGuild,
  rejectJoinGuild,
  closeGuild,
} from 'actions/guildActions';
import { authSelector } from 'reducers/selectors';
import {
  REQUEST,
  CREATE_GUILD,
  UPDATE_GUILD,
  GET_GUILD,
  GET_GUILDS_IN_GAME,
  GET_GUILDS_BY_USER,
  REQUEST_JOIN,
  CANCEL_JOIN,
  ACCEPT_JOIN,
  REJECT_JOIN,
  CLOSE_GUILD,
} from 'actions/actionTypes';

export function* createGuildSaga(action) {
  try {
    // TODO: remove this when we can set default header axios on client
    const { token, jwtToken } = yield select(authSelector);
    const createGuildUrl = `/`;
    const { response, error } = yield call(callApi, createGuildUrl, {
      method: 'POST',
      data: action.guild,
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(createGuild.success(response.data || {}));
  } catch (error) {
    console.error(error);
    yield put(createGuild.failure(error));
  }
}

export function* updateGuildSaga(action) {
  try {
    const { guildID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const updateGuildUrl = `/${guildID}`;
    const { response, error } = yield call(callApi, updateGuildUrl, {
      method: 'PUT',
      data: action.guild,
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(updateGuild.success(response.data || {}));
    Router.push('/guilds/[guildID]', `/guilds/${guildID}`);
  } catch (error) {
    console.error(error);
    yield put(updateGuild.failure(error));
  }
}

export function* getGuildSaga(action) {
  try {
    const { token, jwtToken } = yield select(authSelector);
    const { guildID } = action;
    const getGuildUrl = `/${guildID}`;
    const { response, error } = yield call(callApi, getGuildUrl, {
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(getGuild.success(response.data || {}));
  } catch (error) {
    console.error(error);
    yield put(getGuild.failure(error));
  }
}

export function* getGuildsInGameSaga(action) {
  try {
    const { token, jwtToken } = yield select(authSelector);
    const { gameID } = action;
    const getGuildsInGameUrl = `/game/${gameID}?page=1`;
    const { response, error } = yield call(callApi, getGuildsInGameUrl, {
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(getGuildsInGame.success(response.data.docs || {}));
  } catch (error) {
    console.error(error);
    yield put(getGuildsInGame.failure(error));
  }
}

export function* getGuildsByUserSaga(action) {
  try {
    const { token, jwtToken, user } = yield select(authSelector);
    const getGuildsByUserUrl = `/user/${user.id}?page=1`;
    const { response, error } = yield call(callApi, getGuildsByUserUrl, {
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(getGuildsByUser.success(response.data.docs || {}));
  } catch (error) {
    console.error(error);
    yield put(getGuildsByUser.failure(error));
  }
}

export function* requestJoinGuildSaga(action) {
  try {
    const { guildID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const requestJoinGuildUrl = `/${guildID}/request`;
    const { response, error } = yield call(callApi, requestJoinGuildUrl, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    const newRequest = response.data;
    yield put(requestJoinGuild.success(guildID, newRequest));
  } catch (error) {
    console.error(error);
    yield put(requestJoinGuild.failure(error));
  }
}

export function* cancelJoinGuildSaga(action) {
  try {
    const { guildID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const cancelJoinGuildUrl = `/${guildID}/request`;
    const { response, error } = yield call(callApi, cancelJoinGuildUrl, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(cancelJoinGuild.success());
  } catch (error) {
    console.error(error);
    yield put(cancelJoinGuild.failure(error));
  }
}

export function* acceptJoinGuildSaga(action) {
  try {
    const { guildID, requestID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const acceptJoinGuildUrl = `/${guildID}/accept`;
    const { response, error } = yield call(callApi, acceptJoinGuildUrl, {
      method: 'PUT',
      data: { requestID: requestID },
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(acceptJoinGuild.success(requestID));
  } catch (error) {
    console.error(error);
    yield put(acceptJoinGuild.failure(error));
  }
}

export function* rejectJoinGuildSaga(action) {
  try {
    const { guildID, requestID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const rejectJoinGuildUrl = `/${guildID}/reject`;
    const { response, error } = yield call(callApi, rejectJoinGuildUrl, {
      method: 'PUT',
      data: { requestID: requestID },
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }
    yield put(rejectJoinGuild.success(requestID));
  } catch (error) {
    console.error(error);
    yield put(rejectJoinGuild.failure(error));
  }
}

export function* closeGuildSaga(action) {
  try {
    const { guildID } = action;
    const { token, jwtToken } = yield select(authSelector);
    const closeGuildUrl = `/${guildID}/close`;
    const { response, error } = yield call(callApi, closeGuildUrl, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'x-jwt-token': jwtToken,
      },
    });

    // TODO: handle errors
    if (error) {
      throw error;
    }

    yield put(closeGuild.success());
  } catch (error) {
    console.error(error);
    yield put(closeGuild.failure(error));
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(CREATE_GUILD[REQUEST], createGuildSaga),
    yield takeLatest(UPDATE_GUILD[REQUEST], updateGuildSaga),
    yield takeLatest(GET_GUILD[REQUEST], getGuildSaga),
    yield takeLatest(GET_GUILDS_IN_GAME[REQUEST], getGuildsInGameSaga),
    yield takeLatest(GET_GUILDS_BY_USER[REQUEST], getGuildsByUserSaga),
    yield takeLatest(REQUEST_JOIN[REQUEST], requestJoinGuildSaga),
    yield takeLatest(CANCEL_JOIN[REQUEST], cancelJoinGuildSaga),
    yield takeLatest(ACCEPT_JOIN[REQUEST], acceptJoinGuildSaga),
    yield takeLatest(REJECT_JOIN[REQUEST], rejectJoinGuildSaga),
    yield takeLatest(CLOSE_GUILD[REQUEST], closeGuildSaga),
  ]);
}
