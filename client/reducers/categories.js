import Immutable from 'seamless-immutable';
import * as actions from '../actions/categories';

// TODO: fetch on init
const initialState = Immutable.from([
  // 'soccer',
  // 'volleyball',
  // 'basketball',
  // 'americanfootball',
  // 'baseball',
  // 'pingpong',
  // 'tennis',
  // 'foosball',
  // 'bowling',
  // 'chess',
]);

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CATEGORIES_SUCCESS:
      return Immutable.from(payload.result);
    default:
      return state;
  }
};

export default categoriesReducer;
