import auth from './auth';
import events from './events';

export default function* rootSaga() {
  yield [
    ...auth,
    ...events,
  ]
}
