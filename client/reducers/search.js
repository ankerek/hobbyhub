import Immutable from 'seamless-immutable';
import * as actions from '../actions/events';

const initialState = Immutable.from({
  filters: {
    categories: [],
  },
  active: false,
});

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SEARCH_EVENTS:
      return state.merge({
        filters: payload,
        active: true,
      }, {deep: true})
    case actions.FILTER_BY_CATEGORY:
      const { name } = payload;
      let categories = [...state.filters.categories];
      const index = categories.indexOf(name);
      if(index !== -1) categories.splice(index, 1);
      else categories.push(name);

      return state
              .set('active', !!categories.length)
              .setIn(['filters', 'categories'], categories)
    case actions.RESET_SEARCH_EVENTS:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;

export const getActiveCategories = (state) =>
  state.filters.categories
