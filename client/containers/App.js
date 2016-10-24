import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';

import Home from './Home';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/events" component={Home} />

        </div>
      </BrowserRouter>
    );

  }
}

