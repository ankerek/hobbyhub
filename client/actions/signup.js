export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signup = ({ email, password }) => ({
  type: SIGNUP_REQUEST,
  payload: { email, password },
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = ({ user }) => ({
  type: SIGNUP_SUCCESS,
  payload: { user },
});

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const signupFailure = ({ error }) => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});
