import Immutable from 'seamless-immutable';
import * as actions from '../actions/events';

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
