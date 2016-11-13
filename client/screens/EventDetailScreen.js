import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { getEvent, getIsAttendee } from '../reducers/entities';
import { fetchEvent, joinEvent, leaveEvent } from '../actions/events';
import { Grid, Row, Col, Button, Well, Image } from 'react-bootstrap';

export const mapStateToProps = (state, { params: { id } }) => ({
  event: getEvent(state.entities, id),
  isAttendee: getIsAttendee(state.entities, id, state.auth.user._id),
});

class EventDetailContainer extends React.Component {
  componentDidMount() {
    const { params: { id }, dispatch } = this.props;
    dispatch(fetchEvent(id));
  }

  render() {
    return (
      <EventDetailScreenView {...this.props} />
    )
  }
}

class EventDetailContainer extends React.Component {
  componentDidMount() {
    const { params: { id }, dispatch } = this.props;
    dispatch(fetchEvent(id));
  }

  render() {
    return (
      <EventDetailScreenView {...this.props} />
    )
  }
}

export const EventDetailScreenView = ({ event, isAttendee ,dispatch }) => (
  <Well>
    <Row>
      <Col lg={8}>
          <h1>{event.name}</h1>
          <p>{event.address}</p>
          <p>{event.start}</p>
      </Col>
      <Col lg={4}>
       { isAttendee
          ? <Button bsStyle="danger" bsSize="large" className="pull-right" onClick={() => dispatch(leaveEvent(event._id))}>Leave event</Button>
          : <Button bsStyle="primary" bsSize="large" className="pull-right" onClick={() => dispatch(joinEvent(event._id))}>Attend event</Button> }

      </Col>
    </Row>
    <p>{event.description}</p>
    <h2>{event.attendees.length}/{event.maxPeople}</h2>
    {event.attendees.map(user => (
      <Link key={user.userId} to={`/users/${user.userId}`}><Image src="http://placehold.it/35x35" alt={user.fullName} style={{marginRight: 0.5 + 'em'}}></Image>{user.fullName}</Link>
    ))}
  </Well>
);

EventDetailScreenView.propTypes = {
  event: T.object.isRequired,
  dispatch: T.func.isRequired,
};

const EventDetailScreen = compose(
  connect(mapStateToProps)
)(EventDetailContainer);

export default EventDetailScreen;
