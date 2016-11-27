export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const fetchEvents = () => ({
  type: FETCH_EVENTS_REQUEST,
});

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const fetchEventsSuccess = ({ entities, result }) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { entities, result },
})

export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const fetchEventsFailure = ({ error }) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error },
})

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const fetchEvent = (id) => ({
  type: FETCH_EVENT_REQUEST,
  id,
});

export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const fetchEventSuccess = ({ entities, result }) => ({
  type: FETCH_EVENT_SUCCESS,
  payload: { entities, result },
})

export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';
export const fetchEventFailure = ({ error }) => ({
  type: FETCH_EVENT_FAILURE,
  payload: { error },
})

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
})

export const JOIN_EVENT_REQUEST = 'JOIN_EVENT_REQUEST';
export const joinEvent = (id) => ({
  type: JOIN_EVENT_REQUEST,
  id,
});

export const JOIN_EVENT_SUCCESS = 'JOIN_EVENT_SUCCESS';
export const joinEventSuccess = ({ entities, result }) => ({
  type: JOIN_EVENT_SUCCESS,
  payload: { entities, result },
})

export const JOIN_EVENT_FAILURE = 'JOIN_EVENT_FAILURE';
export const joinEventFailure = ({ error }) => ({
  type: JOIN_EVENT_FAILURE,
  payload: { error },
})

export const LEAVE_EVENT_REQUEST = 'LEAVE_EVENT_REQUEST';
export const leaveEvent = (id) => ({
  type: LEAVE_EVENT_REQUEST,
  id,
});

export const LEAVE_EVENT_SUCCESS = 'LEAVE_EVENT_SUCCESS';
export const leaveEventSuccess = ({ entities, result }) => ({
  type: LEAVE_EVENT_SUCCESS,
  payload: { entities, result },
})

export const LEAVE_EVENT_FAILURE = 'LEAVE_EVENT_FAILURE';
export const leaveEventFailure = ({ error }) => ({
  type: LEAVE_EVENT_FAILURE,
  payload: { error },
})