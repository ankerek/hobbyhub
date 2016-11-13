import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Row, Col, Button, Well } from 'react-bootstrap';

import { getCurrentUserId, isAuthenticated } from '../reducers/auth';
import { getEvent, getIsAttendee } from '../reducers/entities';
import { fetchEvent, joinEvent, leaveEvent } from '../actions/events';
import { bm, be } from '../utils/bem';
import UserAvatar from '../components/UserAvatar';
import EventPoster from '../components/EventPoster';

export const mapStateToProps = (state, { params: { id } }) => ({
  event: getEvent(state.entities, id),
  isAuthenticated: isAuthenticated(state),
  isAttendee: getIsAttendee(state.entities, id, getCurrentUserId(state)),
});

class EventDetailContainer extends React.Component {
  componentDidMount() {
    const { params: { id }, dispatch } = this.props;
    dispatch(fetchEvent(id));
  }

  render() {
    return renderEventDetailScreen(this.props);
  }
}

export const renderEventDetailScreen = ({
  event,
  isAuthenticated,
  isAttendee,
  dispatch,
}) => (
  <Well>
    {event.categories && event.categories[0] ? (
      <div className="u-spacing20px">
        <EventPoster modifiers="inWell" category={event.categories[0]} />
      </div>
    ) : null}
    <Row>
      <Col lg={8}>
          <h1>{event.name}</h1>
          <p>{event.address}</p>
          <p>{event.start}</p>
      </Col>
      <Col lg={4}>
       { isAuthenticated ? (
         isAttendee ? (
           <Button bsStyle="danger"
                   bsSize="large"
                   className="u-pullRight"
                   onClick={() => dispatch(leaveEvent(event._id))}>Leave event</Button>
         ) : (
           <Button bsStyle="primary"
                   bsSize="large"
                   className="u-pullRight"
                   onClick={() => dispatch(joinEvent(event._id))}>Attend event</Button>
         )
       ) : (
         <Link className="btn btn-primary u-pullRight" to="/sign-up">Sign Up to Attend</Link>
       )}

      </Col>
    </Row>
    <p className="u-spacing40px">{event.description}</p>
    <h2 className="u-spacing20px">Attendees ({event.attendees.length}/{event.maxPeople})</h2>
    <div className={bm('Grid', 'multiCol 5col wrap gutterH5px')}>
      {event.attendees.map(user => (
        <div key={user.userId} className={`${be('Grid', 'cell')}`}>
          <UserAvatar user={user} size={48} withRating />
        </div>
      ))}
    </div>
  </Well>
);

renderEventDetailScreen.propTypes = {
  event: T.object.isRequired,
  dispatch: T.func.isRequired,
};

const EventDetailScreen = compose(
  connect(mapStateToProps)
)(EventDetailContainer);

export default EventDetailScreen;
