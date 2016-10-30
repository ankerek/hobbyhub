import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';

import { Grid, Row, Col, Button, Jumbotron, FormGroup, FormControl, Well } from 'react-bootstrap';
import EventRow from '../components/EventRow';

export const mapStateToProps = (state) => ({
  categories: state.categories,
  events: state.events,
});

export const EventsScreenView = ({
  categories,
  events,
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
      <p>
        More filters...
      </p>
    </Jumbotron>
    <Well>
      <h2>Events</h2>
      {events.map(event => (<EventRow key={event.id} event={event} />))}
    </Well>
  </div>
);

EventsScreenView.propTypes = {
  categories: T.array.isRequired,
  events: T.array.isRequired,
};

const EventsScreen = compose(
  connect(mapStateToProps)
)(EventsScreenView);

export default EventsScreen;
