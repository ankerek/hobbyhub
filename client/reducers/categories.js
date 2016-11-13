import Immutable from 'seamless-immutable';

// TODO: fetch on init
const initialState = Immutable.from([
  'soccer',
  'volleyball',
  'basketball',
  'americanfootball',
  'baseball',
  'pingpong',
  'tennis',
  'foosball',
  'bowling',
  'chess',
]);

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default categoriesReducer;
