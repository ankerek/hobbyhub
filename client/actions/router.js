import * as actions from '../constants/actions';

export const navigate = (payload) => ({
  type: actions.NAVIGATE,
  payload,
})