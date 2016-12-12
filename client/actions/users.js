export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const fetchUser = (id) => ({
  type: FETCH_USER_REQUEST,
  payload: { id },
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = ({ entities, result }) => ({
  type: FETCH_USER_SUCCESS,
  payload: { entities, result },
});

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = ({ error }) => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const updateUser = ({ file }) => ({
  type: UPDATE_USER_REQUEST,
  payload: { file },
});

export const RATE_USER_REQUEST = 'RATE_USER_REQUEST';
export const rateUser = ({ id, ratedBy, additionalText, percent }) => ({
  type: RATE_USER_REQUEST,
  payload: { id, ratedBy, additionalText, percent },
});

export const RATE_USER_SUCCESS = 'RATE_USER_SUCCESS';
export const rateUserSuccess = ({ entities, result }) => ({
  type: RATE_USER_SUCCESS,
  payload: { entities, result },
});

export const RATE_USER_FAILURE = 'RATE_USER_FAILURE';
export const rateUserFailure = ({ error }) => ({
  type: RATE_USER_FAILURE,
  payload: { error },
});

export const DELETE_USER_RATING_REQUEST = 'DELETE_USER_RATING_REQUEST';
export const deleteUserRating = ({ id, ratedBy }) => ({
  type: DELETE_USER_RATING_REQUEST,
  payload: { id, ratedBy },
});

export const DELETE_USER_RATING_SUCCESS = 'DELETE_USER_RATING_SUCCESS';
export const deleteUserRatingSuccess = ({ entities, result }) => ({
  type: DELETE_USER_RATING_SUCCESS,
  payload: { entities, result },
});

export const DELETE_USER_RATING_FAILURE = 'DELETE_USER_RATING_FAILURE';
export const deleteUserRatingFailure = ({ error }) => ({
  type: DELETE_USER_RATING_FAILURE,
  payload: { error },
});

export const TOGGLE_HIDE_EVENT_REQUEST = 'TOGGLE_HIDE_EVENT_REQUEST';
export const toggleHideEvent = ({ id, userId, hide }) => ({
  type: TOGGLE_HIDE_EVENT_REQUEST,
  payload: { id, userId, hide },
});

export const TOGGLE_HIDE_EVENT_SUCCESS = 'TOGGLE_HIDE_EVENT_SUCCESS';
export const toggleHideEventSuccess = ({ entities, result }) => ({
  type: TOGGLE_HIDE_EVENT_SUCCESS,
  payload: { entities, result },
});

export const TOGGLE_HIDE_EVENT_FAILURE = 'TOGGLE_HIDE_EVENT_FAILURE';
export const toggleHideEventFailure = ({ error }) => ({
  type: TOGGLE_HIDE_EVENT_FAILURE,
  payload: { error },
});
