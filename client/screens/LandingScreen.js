import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';

import { Grid, Row, Col, Button, Jumbotron, Well, FormGroup, FormControl } from 'react-bootstrap';

import EventRow from '../components/EventRow';

export const mapStateToProps = (state) => ({
  upcomingEvents: state.upcomingEvents,
  categories: state.categories,
});

export const LandingScreenView = ({
  upcomingEvents,
  categories,
}) => (
  <div>
    <Jumbotron>
      <Grid>
        <Row>
          <Col lg={8}>
            {categories.map(category => (
              <Link key={category.id} to={`/events/categories/${category.id}`}>|{category.name}|</Link>
            ))}
          </Col>
          <Col lg={4}>
            <FormGroup>
              <FormControl type="text" placeholder="Enter event name..." />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae deserunt earum enim maxime quas quis quos ut voluptatibus? Architecto cum cupiditate dolores error, libero odit provident vitae. Distinctio, expedita.</p>
      <Button bsStyle="primary">
        Sign Up
        <br />
        to get involved
      </Button>
    </Jumbotron>
    <Well>
      <Grid>
        <Row>
          <Col lg={10}>
            <h2>Upcoming Events</h2>
          </Col>
          <Col lg={2}>
            <Link to="/events">See all</Link>
          </Col>
        </Row>
      </Grid>
      {upcomingEvents.map(event => (<EventRow key={event.id} event={event} />))}
    </Well>
  </div>
);

LandingScreenView.propTypes = {
  upcomingEvents: T.array.isRequired,
  categories: T.array.isRequired,
};

const LandingScreen = compose(
  connect(mapStateToProps)
)(LandingScreenView);

export default LandingScreen;
