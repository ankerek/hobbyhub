import events from './events';

export default function* rootSaga() {
  yield [
    ...events,
  ]
}