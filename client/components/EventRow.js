import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';

import { Grid, Row, Col, Button, Well, Image } from 'react-bootstrap';

export const EventRowView = ({
  event,
}) => (
  <Well>
  <Grid>
    <Row>
      <Col lg={1}>
        <Row>
          <Image src="http://placehold.it/80x80" alt="Category avatar" />
        </Row>
      </Col>
      <Col lg={3}>
        <Row>
          <h3>{event.name}</h3>
        </Row>
        <Row>
          <p>{event.address}</p>
        </Row>
        <Row>
          <p>{event.start}</p>
        </Row>
        <Row>
            <Button>
              <Link to="/">Attend</Link>
            </Button>
            <Button>
              <Link to={`/events/${event._id}`}>See Detail</Link>
            </Button>
        </Row>
      </Col>
      <Col lg={2}>
        <Row>
          <h2>{event.attendees.length}/{event.maxPeople}</h2>
        </Row>
      </Col>
      <Col lg={6}>
        {event.attendees.map(user => (
            <Link key={user.userId} to={`/users/${user.userId}`}><Image src="http://placehold.it/35x35" alt={user.fullName} style={{marginRight: 0.5 + 'em'}}></Image></Link>
        ))}
      </Col>
    </Row>
  </Grid>
  </Well>
);

EventRowView.propTypes = {
  event: T.object.isRequired,
};

const EventRow = (EventRowView);

export default EventRow;
