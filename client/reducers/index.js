import { combineReducers } from 'redux';
import categories from './categories';
import upcomingEvents from './upcomingEvents';
import events from './events';

const rootReducer = combineReducers({
  categories,
  upcomingEvents,
  events,
});

export default rootReducer;
