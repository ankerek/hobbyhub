import React, { PropTypes as T } from 'react';
import { FormattedTime } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Row, Col, Button, Well, Glyphicon } from 'react-bootstrap';

import * as attendeeStatus from '../constants/attendeeStatus';
import { getCurrentUserId, isAuthenticated } from '../reducers/auth';
import { getEvent, getIsAcceptedAttendee, getIsPendingAttendee, getIsOrganizer, getEventComments } from '../reducers/entities';
import { fetchEvent, joinEvent, leaveEvent, removeEvent, acceptAttendee } from '../actions/events';
import { createComment } from '../actions/comments';
import { bm, be } from '../utils/bem';
import UserAvatar from '../components/UserAvatar';
import EventPoster from '../components/EventPoster';
import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';

export const mapStateToProps = (state, { params: { id } }) => ({
  event: getEvent(state.entities, id),
  isAuthenticated: isAuthenticated(state),
  isAcceptedAttendee: getIsAcceptedAttendee(state.entities, id, getCurrentUserId(state)),
  isPendingAttendee: getIsPendingAttendee(state.entities, id, getCurrentUserId(state)),
  isOrganizer: getIsOrganizer(state.entities, id, getCurrentUserId(state)),
  comments: getEventComments(state.entities, id),
});

export const mapDispatchToProps = {
  fetchEvent,
  joinEvent,
  leaveEvent,
  removeEvent,
  acceptAttendee,
  createComment,
};

class EventDetailContainer extends React.Component {
  componentDidMount() {
    const { params: { id }, fetchEvent } = this.props;
    fetchEvent(id);
  }

  render() {
    return renderEventDetailScreen(this.props);
  }
}

export const renderEventDetailScreen = ({
  event,
  comments,
  isAuthenticated,
  isAcceptedAttendee,
  isPendingAttendee,
  isOrganizer,
  joinEvent,
  leaveEvent,
  removeEvent,
  acceptAttendee,
  createComment,
}) => {
  let reservedSpots = [];
  for(let i = 0; i < event.spotsReserved; i++) {
    reservedSpots.push(<div key={i} className={`${be('Grid', 'cell')}`}><UserAvatar size={48} reserved /></div>);
  }
  return (
    event._id ? (
      <Well>
        <div className="u-spacing20px">
          <EventPoster modifiers="inWell" category={event.category} />
        </div>
        <Row>
          <Col lg={8}>
            <h1 className="u-spacing10px">{event.name}</h1>
            <p className="u-spacing5px">{event.address}</p>
            <p className="u-spacing10px">
              <FormattedTime day="numeric" month="long" year="numeric" time="long" value={event.start} /> - <FormattedTime day="numeric" month="long" year="numeric" time="long" value={event.end} />
            </p>
          </Col>
          <Col lg={4}>
            <div className={`${bm('Grid', '1col multiCol:30em fit:30em justifyRight gutterH5px')} u-spacing10px`}>
              { isOrganizer && (
                <div className={be('Grid', 'cell')}>
                  <div className={bm('Grid', '1col multiCol:30em fit:30em gutterH5px')}>
                    <div className={be('Grid', 'cell')}>
                      <Button bsStyle="danger"
                              className="u-pullRight"
                              onClick={() => removeEvent(event._id)}>
                       <Glyphicon glyph="trash" /> Delete
                      </Button>
                    </div>
                    <div className={be('Grid', 'cell')}>
                      <Link className="btn btn-success u-pullRight" to={`/events/${event._id}/edit`}>
                        <Glyphicon glyph="pencil" /> Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ) }
              { isAuthenticated ? (
                (isAcceptedAttendee || isPendingAttendee) ? (
                  <div className={be('Grid', 'cell')}>
                    <Button bsStyle="warning"
                            className="u-pullRight"
                            onClick={() => leaveEvent({ id: event._id })}>
                      <Glyphicon glyph="remove" /> Leave
                    </Button>
                  </div>
                ) : (
                  <div className={be('Grid', 'cell')}>
                    <Button bsStyle="primary"
                            className="u-pullRight"
                            onClick={() => joinEvent({ id: event._id })}>
                      <Glyphicon glyph="plus" /> Join
                    </Button>
                  </div>
                )
              ) : (
                <div className={be('Grid', 'cell')}>
                  <Link className="btn btn-primary u-pullRight" to="/sign-up">Sign Up to Attend</Link>
                </div>
              )}
            </div>
            {(isAuthenticated && isPendingAttendee) ? (
              <p className="u-colorInfo u-textRight">
                Pending Acceptance
              </p>
            ) : (
              null
            )}
          </Col>
        </Row>
        <p className="u-spacing40px">{event.description}</p>
        <p className="u-spacing10px">
          Minimum players: <strong>{event.minPeople}</strong><br />
          {event.spotsReserved ?
            <span>Reserved spots: <strong>{event.spotsReserved}</strong></span>
            : ''
          }
        </p>
        <h2 className="u-spacing20px">Attendees ({event.attendees.length + event.spotsReserved}/{event.maxPeople})</h2>
        <div className={bm('Grid', 'multiCol wrap 3col 4col:40em 5col:50em gutterH5px')}>
          {event.attendees.map(attendee => (
            <div key={attendee.user.userId} className={`${be('Grid', 'cell')}`}>
              <UserAvatar user={attendee.user} size={48} withRating />
              {isOrganizer ? (
                <div>
                  {attendee.state === attendeeStatus.STATUS_PENDING ? (
                    <p className="u-textCenter u-spacing5px">
                      <Button bsStyle="success"
                              onClick={() => acceptAttendee({ id: event._id, userId: attendee.user.userId })}>
                        <Glyphicon glyph="check" /> Accept
                      </Button>
                    </p>
                  ) : (
                    null
                  )}
                  <p className="u-textCenter">
                    <Button bsStyle="warning"
                            onClick={() => leaveEvent({ id: event._id, userId: attendee.user.userId })}>
                      <Glyphicon glyph="remove" /> Remove
                    </Button>
                  </p>
                </div>
              ) : (
                null
              )}
            </div>
          ))}
          { reservedSpots }
        </div>
        <div>
          <h2 className="u-spacing20px">Comments</h2>
          { comments && comments.map((comment) => <CommentItem comment={comment} key={comment._id} onSubmit={({ commentId, text }) => createComment({ eventId: event._id, commentId, text })} />) }
          { isAuthenticated &&
            <div>
              <h3>New Comment</h3>
              <CommentForm onSubmit={({ text }) => createComment({ eventId: event._id, text })} />
            </div>
          }
        </div>
      </Well>
    ) : (
      null
    )
  );
}

renderEventDetailScreen.propTypes = {
  event: T.object.isRequired,
  fetchEvent: T.func.isRequired,
  joinEvent: T.func.isRequired,
  leaveEvent: T.func.isRequired,
};

const EventDetailScreen = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EventDetailContainer);

export default EventDetailScreen;
