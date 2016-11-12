import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';
import { navigate } from '../actions/router';
import { history } from '../utils/router';

import AppLayout from './AppLayout';
import LandingScreen from '../screens/LandingScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventFormScreen from '../screens/EventFormScreen';



export const mapStateToProps = (state) => ({
  location: state.router.location,
  action: state.router.action,
});

export const AppView = ({ location, action, dispatch }) => (
  <BrowserRouter
    history={history}
    location={location}
    action={action}
    onChange={(currentLocation, currentAction) => {
      // you must always dispatch a `SYNC` action,
      // because, guess what? you can't actual control the browser history!
      // anyway, use your current action not "SYNC"
      if (currentAction === 'SYNC') {
        dispatch(navigate({ location: currentLocation, action }))
      } else if (!window.block) {
        // if you want to block transitions go into the console and type in
        // `window.block = true` and transitions won't happen anymore
        dispatch(navigate({ location: currentLocation, action: currentAction }))
      } else {
        console.log('blocked!');
      }
    }}
  >
    <div>
      <Match pattern="/" render={props => (
        <AppLayout {...props}>
          <Match exactly pattern={props.pathname} component={LandingScreen} />
          <Match exactly pattern={`${props.pathname}events`} component={EventsScreen} />
          <Match pattern={`${props.pathname}events/:id`} component={EventDetailScreen} />
          <Match pattern={`${props.pathname}add-event`} component={EventFormScreen} />
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

const App = connect(mapStateToProps)(AppView);

export default App;