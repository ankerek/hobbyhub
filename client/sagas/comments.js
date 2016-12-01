import { takeLatest } from 'redux-saga';
import { call, fork, put, select } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import eventSchema from '../schemas/event';
import { getCurrentUser } from '../reducers/auth';
import * as actions from '../actions/comments';

function* createComment({ payload: { eventId, commentId, text } }) {
  try {
    const loggedUser = yield select(getCurrentUser);
    const payload = yield call(
      api.fetch,
      `/api/events/${eventId}/comments${commentId ? `/${commentId}/replies` : ''}`, {
        method: 'POST',
        body: {
          text,
          author: loggedUser.email,
        },
      }
    );

    yield put(actions.createCommentSuccess(normalize(payload, eventSchema)));
  } catch (error) {
    console.log('error', error);
    // TODO show error
    yield put(actions.createCommentFailure({ error }));
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchCreateComment() {
  yield* takeLatest(actions.CREATE_COMMENT_REQUEST, createComment);
}

//=====================================
//  ROOT
//-------------------------------------

const eventsSagas = [
  fork(watchCreateComment),
];

export default eventsSagas;
