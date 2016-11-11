import { combineReducers } from 'redux';
import entities from './entities';
import categories from './categories';
import upcomingEvents from './upcomingEvents';
import events from './events';
import { getEvent, getUser } from './entities';

const rootReducer = combineReducers({
  entities,
  categories,
  upcomingEvents,
  events,
});

export default rootReducer;

export const getAllEvents = (state) =>
  state.events.map(id => getEvent(state.entities, id))