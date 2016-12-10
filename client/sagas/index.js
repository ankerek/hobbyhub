import auth from './auth';
import events from './events';
import categories from './categories';
import comments from './comments';
import users from './users';

export default function* rootSaga() {
  yield [
    ...auth,
    ...events,
    ...categories,
    ...comments,
    ...users,
  ]
}
