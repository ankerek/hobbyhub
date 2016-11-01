import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import AppLayout from './AppLayout';
import LandingScreen from '../screens/LandingScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

export const AppView = () => (
  <BrowserRouter>
    <div>
      <Match pattern="/" render={props => (
        <AppLayout {...props}>
          <Match exactly pattern={props.pathname} component={LandingScreen} />
          <Match exactly pattern={`${props.pathname}events`} component={EventsScreen} />
          <Match pattern={`${props.pathname}events/:id`} component={EventDetailScreen} />
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
