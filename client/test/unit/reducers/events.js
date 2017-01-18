import test from 'tape';
import Immutable from 'seamless-immutable';

import reducer from '../../../reducers/events.js';

function getState({
  events = [],
}) {
  return Immutable.from(events);
}

test('reducers/events: reducer', t => {
  let initialState;
  let action;
  let actual;
  let expected;

  initialState = getState({});

  action = {
    type: 'FETCH_EVENTS_SUCCESS',
    payload: {
      entities: {
        events: {
          1: {
            name: 'Testing Event',
          },
          2: {
            name: 'Testing Event 2',
          },
        },
      },
      result: [1, 2]
    },
  };

  actual = reducer(initialState, action);

  expected = [1, 2];

  t.deepEqual(actual, expected, 'should get events ids');

  t.end();
});
