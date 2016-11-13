import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getUser } from '../reducers';
import { navigate } from '../actions/router';
import * as actions from '../actions/auth';

function* loginTask({ email, password }) {
  console.log(email, password);
  try {
    // TODO: add API call
    // const payload = yield call(api.fetch, '/api/login', { method: 'POST', data });
    yield put(actions.loginSuccess({
      user: {
        _id: '5813da8856b7c14ed2773636',
        anonymous: false,
        email: 'bbbobb@bob.bob',
        fullName: 'Bob Lbob',
      },
    }));

    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.loginFailure());
  }
}

function* logoutTask() {
  try {
    // TODO: add API call
    // const payload = yield call(api.fetch, '/api/logout', { method: 'POST' });
    yield put(actions.logoutSuccess());

    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.logoutFailure());
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchLogin() {
  yield* takeLatest(actions.LOGIN_REQUEST, loginTask);
}

function* watchLogout() {
  yield* takeLatest(actions.LOGOUT_REQUEST, logoutTask);
}

//=====================================
//  ROOT
//-------------------------------------

const authSagas = [
  fork(watchLogin),
  fork(watchLogout),
];

export default authSagas;
