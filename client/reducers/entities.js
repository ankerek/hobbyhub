import Immutable from 'seamless-immutable';
import { get as g } from 'lodash';
import * as attendeeStatus from '../constants/attendeeStatus';

const initialState = Immutable.from({
  categories: {},
  events: {},
  users: {},
  attendees: {},
  organizers: {},
  comments: {},
});

const entities = (state = initialState, action) => {
  const { payload } = action;
  if (payload && payload.entities) {
    return state.merge(payload.entities, {deep: true});
  }

  return state;
};

export default entities;

export const getEvent = (state, id) => ({
  ...state.events[id],
  attendees: state.events[id] ? getAttendeesByEvent(state, state.events[id].attendees) : [],
});
export const getUser = (state, id) => g(state, 'users.' + id, null);
export const getAttendee = (state, id) => ({
  ...state.attendees[id],
  user: getUser(state, id),
});

export const getComment = (state, id) => state.comments[id];

export const getUsersByEvent = (state, ids) =>
  ids.map(id => getUser(state, id));

export const getAttendeesByEvent = (state, ids) =>
  ids.map(id => getAttendee(state, id));

export const getIsAttendee = (state, eventId, userId) =>
  state.events[eventId] &&
  state.events[eventId].attendees.includes(userId);

export const getIsAcceptedAttendee = (state, eventId, userId) =>
  getIsAttendee(state, eventId, userId) &&
  state.attendees[userId].state === attendeeStatus.STATUS_ACCEPTED;

export const getIsPendingAttendee = (state, eventId, userId) =>
  getIsAttendee(state, eventId, userId) &&
  state.attendees[userId].state === attendeeStatus.STATUS_PENDING;

export const getOrganizerByEvent = (state, event) =>
  getUser(state, event.organizer);

export const getOrganizer = (state, eventId) =>
  getOrganizerByEvent(state, getEvent(state, eventId));


export const getIsOrganizer = (state, eventId, userId) => state.events[eventId] && state.users[userId] && state.events[eventId].organizer === userId;
export const getCategory = (state, id) => state.categories[id];
export const getCategoryName = (state, id) => state.categories[id].name;

export const getEventComments = (state, eventId) => state.events[eventId] && state.events[eventId].comments.map(id => getComment(state, id));


