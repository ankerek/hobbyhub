import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import userSchema from '../schemas/user';
import { getIsSearchActive, getSearchFilters } from '../reducers';
import { getCurrentUser } from '../reducers/auth';
import { navigate } from '../actions/router';
import * as actions from '../actions/users';

function* fetchUser({ payload: { id } }) {
  try {
    const payload = yield call(api.fetch, `/api/users/${id}`, { method: 'GET' });
    yield put(actions.fetchUserSuccess(normalize(payload, userSchema)));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserFailure({ error }));
  }
}

function* rateUser({ payload: { id, ratedBy, additionalText, percent } }) {
  try {
    const payload = yield call(api.fetch, `/api/users/${id}/rating`, {
      method: 'POST',
      body: {
        ratedBy,
        text: additionalText,
        percent,
      },
    });
    yield put(actions.rateUserSuccess(normalize(payload, userSchema)));
  } catch (error) {
    console.log(error);
    yield put(actions.rateUserFailure({ error }));
  }
}

function* deleteUserRating({ payload: { id, ratedBy } }) {
  try {
    const payload = yield call(api.fetch, `/api/users/${id}/rating`, {
      method: 'DELETE',
      body: {
        ratedBy,
      },
    });
    yield put(actions.deleteUserRatingSuccess(normalize(payload, userSchema)));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteUserRatingFailure({ error }));
  }
}

//=====================================
//  WATCHERS
//-------------------------------------


function* watchFetchUser() {
  yield* takeLatest(actions.FETCH_USER_REQUEST, fetchUser);
}

function* watchRateUser() {
  yield* takeLatest(actions.RATE_USER_REQUEST, rateUser);
}

function* watchDeleteUserRating() {
  yield* takeLatest(actions.DELETE_USER_RATING_REQUEST, deleteUserRating);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchUser),
  fork(watchRateUser),
  fork(watchDeleteUserRating),
];

export default eventsSagas;
