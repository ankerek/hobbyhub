import { takeLatest, delay } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import * as actions from '../constants/actions';

// function* createJob(action) {
//   const terminal = yield select(getTerminal);
//   const token = yield select(getToken);
//   try {
//     const payload = yield call(
//       api.fetch, 
//       '/api/v2/order', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'X-CSRF-Token': token,
//         },
//         body: JSON.stringify({
//           ...action.payload,
//           'enter-loc': terminal,
//           type: 'tablet',
//         })
//       }
//     );
    
//     if(payload && payload.result === 'error') yield put({ type: actions.CREATE_JOB_CANCEL, payload: { error: true } });
//     else yield put({ type: actions.CREATE_JOB_SUCCESS, payload });
//   } catch (error) {
//     console.log('error', error);
//     yield put({ type: actions.CREATE_JOB_FAILURE, payload: { error: true } });
//   }
// }

function* fetchEvents() {
  try {
    const payload = yield call(api.fetch, `/api/events`, { method: 'GET' });
    yield put({ type: actions.FETCH_EVENTS_SUCCESS, payload: normalize(payload, arrayOf(eventSchema)) });
  } catch (error) {
    console.log(error);
    yield put({ type: actions.FETCH_EVENTS_FAILURE });
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchFetchEvents() {
  yield* takeLatest(actions.FETCH_EVENTS_REQUEST, fetchEvents);
}

// function* watchCreateJob() {
//   yield* takeLatest(actions.CREATE_JOB_REQUEST, createJob);
// }

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchFetchEvents),
];

export default eventsSagas;