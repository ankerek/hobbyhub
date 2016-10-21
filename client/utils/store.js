import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const sagaMiddleware = createSagaMiddleware();
    
  const middlewares = [ sagaMiddleware ];
  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  //sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

