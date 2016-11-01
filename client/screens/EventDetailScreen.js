import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { getEventById } from '../reducers/events';
import { Grid, Row, Col, Button, Well } from 'react-bootstrap';

export const mapStateToProps = (state, { params: { id } }) => ({
  event: getEventById(state.events, id),
});

export const EventDetailScreenView = ({ event }) => (
  <Well>
    <Row>
      <Col lg={8}>
        <h1>{event.title}</h1>
        <p>{event.address}</p>
        <p>{event.time}</p>
      </Col>
      <Col lg={4}>
        <Button bsStyle="primary" bsSize="large" className="pull-right">GO!</Button>
      </Col>
    </Row>
    <p>{event.description}</p>
    <h2>{event.participants.length}/{event.maxParticipants}</h2>
    <ul>
      {event.participants.map(user => (
        <li><Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link></li>
      ))}
    </ul>
  </Well>
);

EventDetailScreenView.propTypes = {
  event: T.object.isRequired,
};

const EventDetailScreen = compose(
  connect(mapStateToProps)
)(EventDetailScreenView);

export default EventDetailScreen;
