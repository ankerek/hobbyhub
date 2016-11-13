import Immutable from 'seamless-immutable';
import * as actions from '../actions/auth';

const anonymousUser = {
  _id: 0,
  anonymous: true,
  email: 'Anonymous@hobbyhub.cz',
  fullName: 'Anonymous',
};

const initialState = Immutable.from({
  user: anonymousUser,
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_SUCCESS:
      return state.set('user', payload.user);
    case actions.LOGOUT_SUCCESS:
      return state.set('user', anonymousUser);
    default:
      return state;
  }
};

export const getCurrentUser = (state) => state.auth.user;
export const getCurrentUserId = (state) => getCurrentUser(state)._id;
export const isAuthenticated = (state) => !getCurrentUser(state).anonymous;

export default authReducer;
