import Immutable from 'seamless-immutable';

// TODO: fetch on init
const initialState = Immutable.from([{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'volleyball',
}, {
  id: 3,
  name: 'basketball',
}, {
  id: 4,
  name: 'americanfootball',
}, {
  id: 5,
  name: 'baseball',
}, {
  id: 6,
  name: 'pingpong',
}, {
  id: 7,
  name: 'tennis',
}, {
  id: 8,
  name: 'foosball',
}, {
  id: 9,
  name: 'bowling',
}, {
  id: 10,
  name: 'chess',
}]);

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default categoriesReducer;
