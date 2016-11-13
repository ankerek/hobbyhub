import Immutable from 'seamless-immutable';
import * as actions from '../actions/auth';

const anonymousUser = {
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

export default authReducer;
