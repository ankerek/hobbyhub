export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const login = ({ email, password }) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ({ user }) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
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
export const logoutFailure = () => ({
  type: LOGIN_FAILURE,
});
