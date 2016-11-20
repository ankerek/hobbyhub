import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import App from './components/App';

export const RootView = ({
  store,
}) => (
  <Provider store={store}>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </Provider>
);

export default RootView;
