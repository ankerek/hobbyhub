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

//=====================================
//  WATCHERS
//-------------------------------------


function* watchFetchUser() {
  yield* takeLatest(actions.FETCH_USER_REQUEST, fetchUser);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchUser),
];

export default eventsSagas;
