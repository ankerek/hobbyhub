import Immutable from 'seamless-immutable';

// TODO: fetch on init
const initialState = Immutable.from([{
  id: 1,
  title: 'Testing #1',
  address: 'Řižkov 8, Neznámého 12',
  time: 1477832806, // in seconds
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp',
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

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default eventsReducer;

export const getEventById = (state, id) => state.find(event => event.id === Number(id))