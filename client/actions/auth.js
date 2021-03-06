export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const login = ({ email, password }) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ({ user, entities, result }) => ({
  type: LOGIN_SUCCESS,
  payload: { user, entities, result },
});

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = ({ error }) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = ({ error }) => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const register = ({ email, password, firstName, lastName }) => ({
  type: REGISTER_REQUEST,
  payload: { email, password, firstName, lastName },
});

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = ({ user, entities, result }) => ({
  type: REGISTER_SUCCESS,
  payload: { user, entities, result },
});

export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const registerFailure = ({ error }) => ({
  type: REGISTER_FAILURE,
  payload: { error },
});

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const currentUser = () => ({
  type: CURRENT_USER_REQUEST,
});

export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const currentUserSuccess = ({ user, entities, result }) => ({
  type: CURRENT_USER_SUCCESS,
  payload: { user, entities, result },
});

export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';
export const currentUserFailure = ({ error }) => ({
  type: CURRENT_USER_FAILURE,
  payload: { error },
});
