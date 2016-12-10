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
