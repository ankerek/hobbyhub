import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getUser } from '../reducers';
import { navigate } from '../actions/router';
import * as actions from '../constants/actions';

function* fetchEvents() {
  try {
    const payload = yield call(api.fetch, '/api/events', { method: 'GET' });
    yield put({ type: actions.FETCH_EVENTS_SUCCESS, payload: normalize(payload, arrayOf(eventSchema)) });
  } catch (error) {
    console.log(error);
    yield put({ type: actions.FETCH_EVENTS_FAILURE });
  }
}

function* fetchEvent({ id }) {
  try {
    const payload = yield call(api.fetch, `/api/events/${id}`, { method: 'GET' });
    yield put({ type: actions.FETCH_EVENT_SUCCESS, payload: normalize(payload, eventSchema) });
  } catch (error) {
    console.log(error);
    yield put({ type: actions.FETCH_EVENT_FAILURE });
  }
}

function* createEvent({ data }) {
  try {
    const loggedUser = yield select(getUser);
    const payload = yield call(
      api.fetch,
      '/api/events', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          organizer: loggedUser.email,
        })
      }
    );

    yield put({ type: actions.CREATE_EVENT_SUCCESS, payload });
    yield put(navigate({ pathname: `/events/${payload._id}` }));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put({ type: actions.CREATE_EVENT_FAILURE, });
  }
}

function* joinLeaveEvent({ type, id }) {
  try {
    const loggedUser = yield select(getUser);
    const payload = yield call(
      api.fetch,
      `/api/events/${id}/attendees/${loggedUser._id}`, {
        method: type === actions.JOIN_EVENT_REQUEST ? 'PUT' : 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    yield put({ type: type === actions.JOIN_EVENT_REQUEST ? actions.JOIN_EVENT_SUCCESS : actions.LEAVE_EVENT_SUCCESS, payload: normalize(payload, eventSchema) });
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put({ type: type === actions.JOIN_EVENT_REQUEST ? actions.JOIN_EVENT_FAILURE : actions.LEAVE_EVENT_FAILURE, });
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchFetchEvents() {
  yield* takeLatest(actions.FETCH_EVENTS_REQUEST, fetchEvents);
}

function* watchFetchEvent() {
  yield* takeLatest(actions.FETCH_EVENT_REQUEST, fetchEvent);
}

function* watchCreateEvent() {
  yield* takeLatest(actions.CREATE_EVENT_REQUEST, createEvent);
}

function* watchJoinLeaveEvent() {
  yield* takeLatest([actions.JOIN_EVENT_REQUEST, actions.LEAVE_EVENT_REQUEST], joinLeaveEvent);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchEvents),
  fork(watchFetchEvent),
  fork(watchCreateEvent),
  fork(watchJoinLeaveEvent),
];

export default eventsSagas;
