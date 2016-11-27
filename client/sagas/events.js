import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getCurrentUser } from '../reducers/auth';
import { navigate } from '../actions/router';
import * as actions from '../actions/events';

function* fetchEvents() {
  try {
    const payload = yield call(api.fetch, '/api/events', { method: 'GET' });
    yield put(actions.fetchEventsSuccess(normalize(payload, arrayOf(eventSchema))));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchEventsFailure({ error }));
  }
}

function* fetchEvent({ id }) {
  try {
    const payload = yield call(api.fetch, `/api/events/${id}`, { method: 'GET' });
    yield put(actions.fetchEventSuccess(normalize(payload, eventSchema)));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchEventFailure({ error }));
  }
}

function* createEvent({ data }) {
  try {
    const isEdit = !!data._id;
    const loggedUser = yield select(getCurrentUser);
    const payload = yield call(
      api.fetch,
      `/api/events${isEdit ? `/${data._id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        body: {
          ...data,
          organizer: loggedUser.email,
        },
      }
    );

    yield put(actions.createEventSuccess(payload));
    yield put(navigate({ pathname: `/events/${payload._id}` }));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put(actions.createEventFailure({ error }));
  }
}

function* joinLeaveEvent({ type, id }) {
  try {
    const loggedUser = yield select(getCurrentUser);
    const payload = yield call(
      api.fetch,
      `/api/events/${id}/attendees/${loggedUser._id}`, {
        method: type === actions.JOIN_EVENT_REQUEST ? 'PUT' : 'DELETE',
      }
    );

    const normalized = normalize(payload, eventSchema);

    yield put(type === actions.JOIN_EVENT_REQUEST ? actions.joinEventSuccess(normalized) : actions.leaveEventSuccess(normalized));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put(type === actions.JOIN_EVENT_REQUEST ? actions.joinEventFailure({ error }) : actions.leaveEventFailure({ error }));
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
