import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import AppLayout from './AppLayout';
import LandingScreen from '../screens/LandingScreen';
import EventsScreen from '../screens/EventsScreen';

export const AppView = () => (
  <BrowserRouter>
    <div>
      <Match pattern="/" render={props => (
        <AppLayout {...props}>
          <Match exactly pattern={props.pathname} component={LandingScreen} />
          <Match pattern={`${props.pathname}events`} component={EventsScreen} />
          <Miss component={() => (
            <div>
              I missed the route:
              <pre>{JSON.stringify(props.location)}</pre>
            </div>
          )} />
        </AppLayout>
      )}>
      </Match>
    </div>
  </BrowserRouter>
);

const App = (AppView);

export default App;
