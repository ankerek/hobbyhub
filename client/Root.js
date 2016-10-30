import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './components/App';

export const RootView = ({
  store,
}) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootView;
