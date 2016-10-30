import Immutable from 'seamless-immutable';

// TODO: fetch on init
const initialState = Immutable.from([{
  id: 1,
  title: 'Testing #1',
  address: 'Řižkov 8, Neznámého 12',
  time: 1477832806, // in seconds
  maxParticipants: 10,
  participants: [{
    id: 1,
    name: 'User #1',
  }, {
    id: 2,
    name: 'User #2',
  }, {
    id: 3,
    name: 'User #3',
  }],
}, {
  id: 2,
  title: 'Testing #2',
  address: 'Řižkov 80, Neznámého 1232',
  time: 1477832806, // in seconds
  maxParticipants: 8,
  participants: [{
    id: 1,
    name: 'User #1',
  }, {
    id: 2,
    name: 'User #2',
  }, {
    id: 3,
    name: 'User #3',
  }, {
    id: 4,
    name: 'User #4',
  }, {
    id: 5,
    name: 'User #5',
  }],
}]);

const upcomingEventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default upcomingEventsReducer;
