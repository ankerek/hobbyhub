import Immutable from 'seamless-immutable';
import * as actions from '../constants/actions';

const initialState = Immutable.from({
  user: {
    _id: '5813da8856b7c14ed2773636',
    email: 'bbbobb@bob.bob',
    fullName: 'Bob Lbob',
  }
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default authReducer;