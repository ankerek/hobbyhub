import auth from './auth';
import events from './events';
import categories from './categories';

export default function* rootSaga() {
  yield [
    ...auth,
    ...events,
    ...categories,
  ]
}
