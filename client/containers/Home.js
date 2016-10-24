import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

@connect(
  state => ({
    
  })
)
export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}