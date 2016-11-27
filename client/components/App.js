import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter';
import { navigate } from '../actions/router';
import { history } from '../utils/router';
import { fetchCategories } from '../actions/categories';

import AppLayout from './AppLayout';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventFormScreen from '../screens/EventFormScreen';



export const mapStateToProps = (state) => ({
  location: state.router.location,
  action: state.router.action,
});

const mapDispatchToProps = {
  fetchCategories,
  navigate,
};

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return renderAppView(this.props);
  }
}

export const renderAppView = ({ location, action, navigate }) => (
  <BrowserRouter
    history={history}
    location={location}
    action={action}
    onChange={(currentLocation, currentAction) => {
      // you must always dispatch a `SYNC` action,
      // because, guess what? you can't actual control the browser history!
      // anyway, use your current action not "SYNC"
      if (currentAction === 'SYNC') {
        navigate({ location: currentLocation, action })
      } else if (!window.block) {
        // if you want to block transitions go into the console and type in
        // `window.block = true` and transitions won't happen anymore
        navigate({ location: currentLocation, action: currentAction })
      } else {
        console.log('blocked!');
      }
    }}
  >
    <div>
      <Match pattern="/" render={props => (
        <AppLayout {...props}>
          <Match exactly pattern={props.pathname} component={LandingScreen} />
          <Match pattern={`${props.pathname}login`} component={LoginScreen} />
          <Match pattern={`${props.pathname}sign-up`} component={SignupScreen} />
          <Match exactly pattern={`${props.pathname}events`} component={EventsScreen} />
          <Match exactly pattern={`${props.pathname}events/:id`} component={EventDetailScreen} />
          <Match exactly pattern={`${props.pathname}events/:id/edit`} component={EventFormScreen} />
          <Match exactly pattern={`${props.pathname}events/categories/:categoryId`} component={EventsScreen} />
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

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default App;
