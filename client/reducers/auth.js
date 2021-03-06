import Immutable from 'seamless-immutable';
import { get as g } from 'lodash';
import * as actions from '../actions/auth';
import { getUser } from './entities';

const anonymousUser = {
  _id: 0,
  anonymous: true,
  email: 'Anonymous@hobbyhub.cz',
  fullName: 'Anonymous',
};

const initialState = Immutable.from({
  user: anonymousUser,
  authError: null,
  registerError: null,
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_SUCCESS:
    case actions.CURRENT_USER_SUCCESS:
    case actions.REGISTER_SUCCESS:
      return state
        .set('user', payload.user)
        .set('authError', null)
        .set('registerError', null);
    case actions.LOGOUT_SUCCESS:
      return state
        .set('user', anonymousUser)
        .set('authError', null)
        .set('registerError', null);
    case actions.LOGIN_FAILURE:
    case actions.LOGOUT_FAILURE:
      return state.set('authError', payload.error);
    case actions.REGISTER_FAILURE:
      return state.set('registerError', payload.error);
    default:
      return state;
  }
};

export const getCurrentUserId = (state) => g(state, 'auth.user._id');
export const getCurrentUser = (state) => getUser(state.entities, getCurrentUserId(state)) || anonymousUser;
export const getAuthError = (state) => state.auth.authError;
export const getRegisterError = (state) => state.auth.registerError;
export const isAuthenticated = (state) => !getCurrentUser(state).anonymous;

export default authReducer;
