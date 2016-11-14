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
    return state.merge(payload.entities, {deep: true});
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
export const getIsAttendee = (state, eventId, userId) => state.events[eventId] && state.events[eventId].attendees.includes(userId)
export const getCategory = (state, id) => state.categories[id]
export const getCategoryName = (state, id) => state.categories[id].name