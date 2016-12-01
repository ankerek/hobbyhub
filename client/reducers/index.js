import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import entities from './entities';
import categories from './categories';
import upcomingEvents from './upcomingEvents';
import events from './events';
import auth from './auth';
import search from './search';
import router from './router';
import { getEvent, getCategory, getCategoryName } from './entities';

const rootReducer = combineReducers({
  entities,
  categories,
  upcomingEvents,
  events,
  auth,
  search,
  router,
  form: formReducer,
});

export default rootReducer;

export const getAllEvents = (state) =>
  state.events.map(id => getEvent(state.entities, id));

export const getCategoryEvents = (categoryId) =>
  (state) => {
    const categories = getAllCategories(state);
    const category = categories.find(category => category._id === categoryId);

    return state.events
      .map(id => getEvent(state.entities, id))
      .filter(event => event.category === category.name);
  };

export const getAllCategories = (state) =>
  state.categories.map(id => getCategory(state.entities, id));

export const getAllCategoriesNames = (state) =>
  state.categories.map(id => getCategoryName(state.entities, id));

export const getIsSearchActive = (state) => 
  state.search.active;

export const getSearchFilters = (state) =>
  state.search.filters;

export const getCurrentLocation = (state) =>
  state.router.location;
