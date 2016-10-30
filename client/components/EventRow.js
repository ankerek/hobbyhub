import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';

import { Grid, Row, Col, Button } from 'react-bootstrap';

export const EventRowView = ({
  event,
}) => (
  <Grid>
    <Row>
      <Col lg={1}>
        Category avatar
        TODO: actions
      </Col>
      <Col lg={3}>
        <p>{event.title}</p>
        <p>{event.address}</p>
        <p>{event.time}</p>
        <p>
          <Button>
            <Link to={`/events/${event.id}`}>See Detail</Link>
          </Button>
        </p>
      </Col>
      <Col lg={2}>
        <h2>{event.participants.length}/{event.maxParticipants}</h2>
      </Col>
      <Col lg={6}>
        {event.participants.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>
        ))}
      </Col>
    </Row>
  </Grid>
);

EventRowView.propTypes = {
  event: T.object.isRequired,
};

const EventRow = (EventRowView);

export default EventRow;
