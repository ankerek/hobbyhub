import Immutable from 'seamless-immutable';
import * as actions from '../actions/categories';

const initialState = Immutable.from([]);

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CATEGORIES_SUCCESS:
      return Immutable.from(payload.result);
    default:
      return state;
  }
};

export default categoriesReducer;
