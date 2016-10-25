import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './utils/store';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';// eslint-disable-line no-unused-vars

import Root from './Root';

import './theme/css/main.css';

const rootEl = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    //const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <Root store={store} />
      </AppContainer>,
      rootEl
    );
  });
}