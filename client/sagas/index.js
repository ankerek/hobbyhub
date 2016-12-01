import auth from './auth';
import events from './events';
import categories from './categories';
import comments from './comments';

export default function* rootSaga() {
  yield [
    ...auth,
    ...events,
    ...categories,
    ...comments,
  ]
}
