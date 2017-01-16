import test from 'tape';
import Immutable from 'seamless-immutable';

import reducer, * as selectors from '../../../reducers/entities.js';

function getState({
  categories = {},
  events = {},
  users = {},
  attendees = {},
  organizers = {},
  comments = {},
}) {
  return Immutable.from({
    categories,
    events,
    users,
    attendees,
    organizers,
    comments,
  });
}

test('reducers/entities: reducer', t => {
  let initialState;
  let action;
  let actual;
  let expected;

  initialState = getState({
    events: {
      666: {
        name: 'Evil Event',
        attendees: [],
      },
    },
  });

  action = {
    action: 'WHATEVER',
    payload: {
      entities: {
        events: {
          1: {
            name: 'Testing Event',
            attendees: ['1', '2'],
          },
        },
        attendees: {
          1: {
            state: 'PENDING',
            user: {
              userId: '1',
            },
          },
          2: {
            state: 'ACCEPTED',
            user: {
              userId: '2',
            },
          },
        },
        users: {
          1: {
            fullName: 'User #1',
          },
          2: {
            fullName: 'User #2',
          },
        },
      },
    },
  };

  actual = reducer(initialState, action);

  expected = {
    categories: {},
    organizers: {},
    comments: {},
    events: {
      1: {
        name: 'Testing Event',
        attendees: ['1', '2'],
      },
      666: {
        name: 'Evil Event',
        attendees: [],
      },
    },
    attendees: {
      1: {
        state: 'PENDING',
        user: {
          userId: '1',
        },
      },
      2: {
        state: 'ACCEPTED',
        user: {
          userId: '2',
        },
      },
    },
    users: {
      1: {
        fullName: 'User #1',
      },
      2: {
        fullName: 'User #2',
      },
    },
  };

  t.deepEqual(actual, expected, 'should get full event with attendees');

  t.end();
});

test('reducers/entities: getEvent', t => {
  let state;
  let actual;
  let expected;

  state = getState({
    events: {
      1: {
        name: 'Testing Event',
        attendees: ['1', '2'],
      },
    },
    attendees: {
      1: {
        state: 'PENDING',
        user: {
          userId: '1',
        },
      },
      2: {
        state: 'ACCEPTED',
        user: {
          userId: '2',
        },
      },
    },
    users: {
      1: {
        fullName: 'User #1',
      },
      2: {
        fullName: 'User #2',
      },
    },
  });

  actual = selectors.getEvent(state, '1');

  expected = {
    name: 'Testing Event',
    attendees: [
      {
        state: 'PENDING',
        user: {
          fullName: 'User #1',
        },
      },
      {
        state: 'ACCEPTED',
        user: {
          fullName: 'User #2',
        },
      }
    ],
  };

  t.deepEqual(actual, expected, 'should act on any action and deep merge entities');

  t.end();
});
