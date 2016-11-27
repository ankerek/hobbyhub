import Immutable from 'seamless-immutable';
import * as actions from '../actions/events';

// TODO: fetch on init
const initialState = Immutable.from([]);

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_EVENTS_SUCCESS:
      return Immutable.from(payload.result);
    default:
      return state;
  }
};

export default eventsReducer;

export const getEventById = (state, id) => state.find(event => event.id === Number(id))
