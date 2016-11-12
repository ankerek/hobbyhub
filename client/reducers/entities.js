import Immutable from 'seamless-immutable';

const initialState = Immutable.from({
  categories: {},
  events: {},
  users: {},
  comments: {},
})

const entities = (state = initialState, action) => {
  const { payload } = action;
  
  if (payload && payload.entities) {
    return state.merge(payload.entities);
  }

  return state;
}

export default entities;

export const getEvent = (state, id) => ({
  ...state.events[id],
  attendees: state.events[id] ? getUsersByEvent(state, state.events[id].attendees) : [],
})
export const getUser = (state, id) => state.users[id]

export const getUsersByEvent = (state, ids) =>
  ids.map(id => getUser(state, id))