import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { getEvent } from '../reducers/entities';
import { fetchEvent } from '../actions/events';
import { Grid, Row, Col, Button, Well, Image } from 'react-bootstrap';

export const mapStateToProps = (state, { params: { id } }) => ({
  event: getEvent(state.entities, id),
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

export const EventDetailScreenView = ({ event }) => (
  <Well>
    <Row>
      <Col lg={8}>
          <h1>{event.name}</h1>
          <p>{event.address}</p>
          <p>{event.start}</p>
      </Col>
      <Col lg={4}>
        <Button bsStyle="primary" bsSize="large" className="pull-right">Attend</Button>
      </Col>
    </Row>
    <p>{event.description}</p>
    <h2>{event.attendees.length}/{event.maxPeople}</h2>
    {event.attendees.map(user => (
            <Row style={{margin: 1 + 'em'}}>
              <Link key={user._id} to={`/users/${user._id}`}><Image src="http://placehold.it/35x35" alt={user.fullName} style={{marginRight: 0.5 + 'em'}}></Image>{user.fullName}</Link>
            </Row>
        ))}
  </Well>
);

EventDetailScreenView.propTypes = {
  event: T.object.isRequired,
};

const EventDetailScreen = compose(
  connect(mapStateToProps)
)(EventDetailContainer);

export default EventDetailScreen;
