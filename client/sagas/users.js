import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { api } from '../utils/api';
import userSchema from '../schemas/user';
import { getCurrentUser } from '../reducers/auth';
import * as actions from '../actions/users';
import { fetchEvents } from '../actions/events';

function* fetchUser({ payload: { id } }) {
  try {
    const payload = yield call(api.fetch, `/api/users/${id}`, { method: 'GET' });
    yield put(actions.fetchUserSuccess(normalize(payload, userSchema)));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserFailure({ error }));
  }
}

function* updateUser({ payload: { file } }) {
  try {
    const loggedUser = yield select(getCurrentUser);

    const data = new FormData();
    data.append('avatar', file);

    // eslint-disable-next-line no-unused-vars
    const payload = yield call(
      api.upload,
      `/api/users/${loggedUser._id}`, {
        method: 'PUT',
        body: data,
      }
    );

    yield put(actions.fetchUser(loggedUser._id));
    yield put(fetchEvents());

    //yield put(actions.createEventSuccess(payload));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    //yield put(actions.createEventFailure({ error }));
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

function* toggleHideEvent({ payload: { id, userId, hide } }) {
  try {
    const payload = yield call(
      api.fetch,
      `/api/users/${userId}/hidden`, {
        method: hide ? 'POST' : 'DELETE',
        body: {
          eventId: id
        }
      }
    );

    const normalized = normalize(payload, userSchema);

    yield put(actions.toggleHideEventSuccess(normalized));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put(actions.toggleHideEventFailure({ error }));
  }
}

//=====================================
//  WATCHERS
//-------------------------------------


function* watchFetchUser() {
  yield* takeLatest(actions.FETCH_USER_REQUEST, fetchUser);
}

function* watchUpdateUser() {
  yield* takeLatest(actions.UPDATE_USER_REQUEST, updateUser);
}

function* watchRateUser() {
  yield* takeLatest(actions.RATE_USER_REQUEST, rateUser);
}

function* watchDeleteUserRating() {
  yield* takeLatest(actions.DELETE_USER_RATING_REQUEST, deleteUserRating);
}

function* watchToggleHideEvent() {
  yield* takeLatest(actions.TOGGLE_HIDE_EVENT_REQUEST, toggleHideEvent);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchUser),
  fork(watchUpdateUser),
  fork(watchRateUser),
  fork(watchDeleteUserRating),
  fork(watchToggleHideEvent),
];

export default eventsSagas;
