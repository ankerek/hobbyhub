import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import entities from './entities';
import categories from './categories';
import upcomingEvents from './upcomingEvents';
import events from './events';
import auth from './auth';
import router from './router';
import { getEvent, getCategory, getCategoryName } from './entities';

const rootReducer = combineReducers({
  entities,
  categories,
  upcomingEvents,
  events,
  auth,
  router,
  form: formReducer,
});

export default rootReducer;

export const getAllEvents = (state) =>
  state.events.map(id => getEvent(state.entities, id))

export const getAllCategories = (state) =>
  state.categories.map(id => getCategory(state.entities, id))

export const getAllCategoriesNames = (state) =>
  state.categories.map(id => getCategoryName(state.entities, id))