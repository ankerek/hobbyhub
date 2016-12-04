import store from 'store';
import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getCurrentUser } from '../reducers/auth';
import { navigate } from '../actions/router';
import * as actions from '../actions/auth';
import { AUTH_TOKEN_HEADER } from '../constants/api';

function enhanceUser(user) {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }
}

function* authTask() {
  try {
    const user = yield call(api.fetch, '/api/auth', { method: 'GET' });
    yield put(
      actions.currentUserSuccess({
        user: enhanceUser(user),
      })
    );
  } catch (error) {
    console.log(error);
    yield put(actions.currentUserFailure({ error }));
  }
}

function* loginTask(action) {
  try {
    const { email, password } = action.payload;
    const data = { email, password };
    const { token, user } = yield call(api.fetch, '/api/login', { method: 'POST', body: data });

    store.set(AUTH_TOKEN_HEADER, token);

    yield put(
      actions.loginSuccess({
        user: enhanceUser(user),
      })
    );

    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.loginFailure({ error }));
  }
}

function* logoutTask() {
  try {
    yield call(api.fetch, '/api/logout', { method: 'GET' });

    store.remove(AUTH_TOKEN_HEADER);

    yield put(actions.logoutSuccess());


    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.logoutFailure({ error }));
  }
}

function* registerTask(action) {
  try {
    const { email, password, firstName, lastName } = action.payload;
    const data = { email, password, firstName, lastName };

    const user = yield call(api.fetch, '/api/users', { method: 'POST', body: data });
    yield put(
      actions.registerSuccess({
        user: enhanceUser(user),
      })
    );
    yield put(
      actions.login({
        email,
        password,
      })
    );

    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.registerFailure({ error }));
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

function* watchRegister() {
  yield* takeLatest(actions.REGISTER_REQUEST, registerTask);
}

//=====================================
//  ROOT
//-------------------------------------

const authSagas = [
  fork(watchLogin),
  fork(watchLogout),
  fork(watchRegister),
  fork(authTask),
];

export default authSagas;
