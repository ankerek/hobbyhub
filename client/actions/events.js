export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const fetchEvents = (payload) => ({
  type: FETCH_EVENTS_REQUEST,
  payload,
});

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const fetchEventsSuccess = ({ entities, result }) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { entities, result },
});

export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const fetchEventsFailure = ({ error }) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error },
});

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const fetchEvent = (id) => ({
  type: FETCH_EVENT_REQUEST,
  id,
});

export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const fetchEventSuccess = ({ entities, result }) => ({
  type: FETCH_EVENT_SUCCESS,
  payload: { entities, result },
});

export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';
export const fetchEventFailure = ({ error }) => ({
  type: FETCH_EVENT_FAILURE,
  payload: { error },
});

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const createEvent = (data) => ({
  type: CREATE_EVENT_REQUEST,
  data,
});

export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const createEventSuccess = (payload) => ({
  type: CREATE_EVENT_SUCCESS,
  payload,
});

export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const createEventFailure = ({ error }) => ({
  type: CREATE_EVENT_FAILURE,
  payload: { error },
});

export const REMOVE_EVENT_REQUEST = 'REMOVE_EVENT_REQUEST';
export const removeEvent = (id) => ({
  type: REMOVE_EVENT_REQUEST,
  id,
});

export const REMOVE_EVENT_SUCCESS = 'REMOVE_EVENT_SUCCESS';
export const removeEventSuccess = () => ({
  type: REMOVE_EVENT_SUCCESS,
});

export const REMOVE_EVENT_FAILURE = 'REMOVE_EVENT_FAILURE';
export const removeEventFailure = ({ error }) => ({
  type: REMOVE_EVENT_FAILURE,
  payload: { error },
});

export const JOIN_EVENT_REQUEST = 'JOIN_EVENT_REQUEST';
export const joinEvent = ({ id, userId }) => ({
  type: JOIN_EVENT_REQUEST,
  payload: { id, userId },
});

export const JOIN_EVENT_SUCCESS = 'JOIN_EVENT_SUCCESS';
export const joinEventSuccess = ({ entities, result }) => ({
  type: JOIN_EVENT_SUCCESS,
  payload: { entities, result },
});

export const JOIN_EVENT_FAILURE = 'JOIN_EVENT_FAILURE';
export const joinEventFailure = ({ error }) => ({
  type: JOIN_EVENT_FAILURE,
  payload: { error },
});

export const LEAVE_EVENT_REQUEST = 'LEAVE_EVENT_REQUEST';
export const leaveEvent = ({ id, userId }) => ({
  type: LEAVE_EVENT_REQUEST,
  payload: { id, userId },
});

export const LEAVE_EVENT_SUCCESS = 'LEAVE_EVENT_SUCCESS';
export const leaveEventSuccess = ({ entities, result }) => ({
  type: LEAVE_EVENT_SUCCESS,
  payload: { entities, result },
});

export const LEAVE_EVENT_FAILURE = 'LEAVE_EVENT_FAILURE';
export const leaveEventFailure = ({ error }) => ({
  type: LEAVE_EVENT_FAILURE,
  payload: { error },
});

export const ACCEPT_ATTENDEE_REQUEST = 'ACCEPT_ATTENDEE_REQUEST';
export const acceptAttendee = ({ id, userId }) => ({
  type: ACCEPT_ATTENDEE_REQUEST,
  payload: { id, userId },
});

export const ACCEPT_ATTENDEE_SUCCESS = 'ACCEPT_ATTENDEE_SUCCESS';
export const acceptAttendeeSuccess = ({ entities, result }) => ({
  type: ACCEPT_ATTENDEE_SUCCESS,
  payload: { entities, result },
});

export const ACCEPT_ATTENDEE_FAILURE = 'ACCEPT_ATTENDEE_FAILURE';
export const acceptAttendeeFailure = ({ error }) => ({
  type: ACCEPT_ATTENDEE_FAILURE,
  payload: { error },
});

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const searchEvents = (payload) => {
  const filter = {...payload};

  if(filter.emptyfull === 'empty') filter.empty = true;
  else if(filter.emptyfull === 'full') filter.full = true;
  delete filter.emptyfull;

  return {
    type: SEARCH_EVENTS,
    payload: filter,
  };
};

export const RESET_SEARCH_EVENTS = 'RESET_SEARCH_EVENTS';
export const resetSearchEvents = () => ({
  type: RESET_SEARCH_EVENTS,
});

export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const filterByCategory = ({ name }) => ({
  type: FILTER_BY_CATEGORY,
  payload: { name }
});