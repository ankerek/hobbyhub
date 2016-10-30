import Immutable from 'seamless-immutable';

// TODO: fetch on init
const initialState = Immutable.from([{
  id: 1,
  name: "soccer",
}, {
  id: 2,
  name: "volleyball",
}]);

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default categoriesReducer;
