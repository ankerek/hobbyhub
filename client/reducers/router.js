import Immutable from 'seamless-immutable';
import { history } from '../utils/router';
import * as actions from '../constants/actions';

const initialState = Immutable.from({
  location: history.location,
  action: history.action,
})

const reducer = (state = initialState, { type, payload }) => {
  if (type === actions.NAVIGATE) {
    return state.merge(payload)
  } else {
    return state
  }
}

export default reducer;