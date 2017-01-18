import test from 'tape';
import Immutable from 'seamless-immutable';

import reducer, * as selectors from '../../../reducers/auth.js';

const anonymousUser = {
  _id: 0,
  anonymous: true,
  email: 'Anonymous@hobbyhub.cz',
  fullName: 'Anonymous',
};

function getState({
  user = anonymousUser,
  authError = null,
  registerError = null,
}) {
  return Immutable.from({
    user,
    authError,
    registerError,
  });
}

test('reducers/auth: reducer', t => {
  let initialState;
  let action;
  let actual;
  let expected;

  initialState = getState({});

  action = {
    type: 'LOGIN_SUCCESS',
    payload: {
      user: {
        _id: 1,
        anonymous: false,
        fullName: 'Bob Lbob',
      }
    },
  };

  actual = reducer(initialState, action);

  expected = {
    user: {
      _id: 1,
      anonymous: false,
      fullName: 'Bob Lbob',
    },
    authError: null,
    registerError: null,
  };

  t.deepEqual(actual, expected, 'should set user after login');

  t.end();
});

test('reducers/auth: getCurrentUserId', t => {
  let state;
  let actual;
  let expected;

  state = {
    auth: {
      user: {
        _id: 1,
        anonymous: false,
        fullName: 'Bob Lbob',
      },
    }
  };

  actual = selectors.getCurrentUserId(state);

  expected = 1;

  t.deepEqual(actual, expected, 'should get current user id');

  t.end();
});

