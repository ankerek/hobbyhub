import * as actions from '../constants/actions';

export const fetchEvents = () => ({
  type: actions.FETCH_EVENTS_REQUEST,
});

export const fetchEvent = (id) => ({
  type: actions.FETCH_EVENT_REQUEST,
  id,
});

export const createEvent = (data) => {
  if (!Array.isArray(data.categories)) {
    data.categories = [data.categories];
  }

  return ({
    type: actions.CREATE_EVENT_REQUEST,
    data,
  });
};

export const joinEvent = (id) => ({
  type: actions.JOIN_EVENT_REQUEST,
  id,
});

export const leaveEvent = (id) => ({
  type: actions.LEAVE_EVENT_REQUEST,
  id,
});
