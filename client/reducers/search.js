import Immutable from 'seamless-immutable';
import * as actions from '../actions/events';

const initialState = Immutable.from({
  form: {},
  categories: [],
  active: false,
});

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SEARCH_EVENTS:
      return state
              .set('form', payload)
              .set('active', true)
    case actions.FILTER_BY_CATEGORY:
      const { name } = payload;
      let categories = [...state.categories];
      const index = categories.indexOf(name);
      if(index !== -1) categories.splice(index, 1);
      else categories.push(name);

      return state
              .set('active', true)
              .set('categories', categories)
    case actions.RESET_SEARCH_EVENTS:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;

export const getActiveCategories = (state) =>
  state.categories
