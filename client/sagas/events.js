import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getIsSearchActive, getSearchFilters } from '../reducers';
import { getCurrentUser } from '../reducers/auth';
import { navigate } from '../actions/router';
import * as actions from '../actions/events';

function* fetchEvents() {
  try {
    const isSearchActive = yield select(getIsSearchActive);
    const filters = yield select(getSearchFilters);
    const payload = yield call(api.fetch, `/api/events${isSearchActive ? '/search' : ''}`, { 
      method: isSearchActive ? 'POST' : 'GET',
      body: isSearchActive ? {...filters} : null,
    });
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

function* removeEvent({ id }) {
  try {
    yield call(api.fetch, `/api/events/${id}`, { method: 'DELETE' });
    yield put(actions.removeEventSuccess());
    yield put(navigate({ pathname: '/events' }));
  } catch (error) {
    console.log(error);
    yield put(actions.removeEventFailure({ error }));
  }
}

function* joinLeaveEvent({ type, payload: { id, userId } }) {
  try {
    const loggedUser = yield select(getCurrentUser);
    const targetUserId = userId || loggedUser._id;

    const payload = yield call(
      api.fetch,
      `/api/events/${id}/attendees/${targetUserId}`, {
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

function* acceptEventAttendee({ payload: { id, userId } }) {
  try {
    const payload = yield call(
      api.fetch,
      `/api/events/${id}/attendees/${userId}`, {
        method: 'PATCH',
      }
    );

    const normalized = normalize(payload, eventSchema);

    yield put(actions.acceptAttendeeSuccess(normalized));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put(actions.acceptAttendeeFailure({ error }));
  }
}

function* searchEvents({ payload }) {
  if(!payload || (payload && Object.keys(payload).length === 0)) yield put(actions.resetSearchEvents());
  yield put(actions.fetchEvents());
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

function* watchRemoveEvent() {
  yield* takeLatest(actions.REMOVE_EVENT_REQUEST, removeEvent);
}

function* watchJoinLeaveEvent() {
  yield* takeLatest([actions.JOIN_EVENT_REQUEST, actions.LEAVE_EVENT_REQUEST], joinLeaveEvent);
}

function* watchAcceptEventAttendee() {
  yield* takeLatest(actions.ACCEPT_ATTENDEE_REQUEST, acceptEventAttendee);
}

function* watchSearchEvents() {
  yield* takeLatest([actions.SEARCH_EVENTS, actions.FILTER_BY_CATEGORY], searchEvents);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchEvents),
  fork(watchFetchEvent),
  fork(watchCreateEvent),
  fork(watchRemoveEvent),
  fork(watchJoinLeaveEvent),
  fork(watchAcceptEventAttendee),
  fork(watchSearchEvents),
];

export default eventsSagas;
