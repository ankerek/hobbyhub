import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCurrentUserId, isAuthenticated } from '../../reducers/auth';
import { getIsAttendee } from '../../reducers/entities';
import { joinEvent, leaveEvent } from '../../actions/events';
import { navigate } from '../../actions/router';

import { Button, Glyphicon } from 'react-bootstrap';
import CategoryIcon from '../CategoryIcon';
import UserAvatar from '../UserAvatar';
import { bm, be } from '../../utils/bem';

import './index.scss';

export const mapStateToProps = (state, { event }) => ({
  isAuthenticated: isAuthenticated(state),
  isAttendee: getIsAttendee(state.entities, event._id, getCurrentUserId(state)),
});

export const mapDispatchToProps = {
  navigate,
  joinEvent,
  leaveEvent,
};

function dontPropagate(fn) {
  return function(e) {
    e.stopPropagation();
    fn();
  }
}

export const renderEventItem = ({
  moduleName = 'EventItem',
  modifiers = '',
  event,
  isAuthenticated,
  isAttendee,
  navigate,
  joinEvent,
  leaveEvent,
}) => (
  <div className={bm(moduleName, modifiers)} onClick={() => navigate({ pathname: `/events/${event._id}` })}>
    <div className={bm('Grid', '1col multiCol:60em fit:60em gutterA20px')}>
      <div className={`${be('Grid', 'cell')}`}>
        <div className="u-spacing10px">
          <CategoryIcon category={{name: 'soccer'}} />
        </div>
        {isAuthenticated ? (
          isAttendee ? (
            <Button bsStyle="warning" bsSize="sm" onClick={dontPropagate(() => leaveEvent(event._id))}>
              <Glyphicon glyph="remove" /> Leave
            </Button>
          ) : (
            <Button bsStyle="primary" bsSize="sm" onClick={dontPropagate(() => joinEvent(event._id))}>
              <Glyphicon glyph="plus" /> Join
            </Button>
          )
        ) : null}
      </div>
      <div className={`${be('Grid', 'cell')} u-flexOne`}>
        <h3 className="u-spacing5px">
          ({event.attendees.length}/{event.maxPeople}) <Link to={`/events/${event._id}`}>{event.name}</Link>
        </h3>
        <p className="u-spacing5px">{event.address}</p>
        <p className="u-spacing10px">{event.start}</p>
        <div className={bm('Grid', 'multiCol 5col gutterH5px')}>
          {event.attendees.map(user => (
            <div className={`${be('Grid', 'cell')} u-textCenter`}>
              <Link key={user.userId} to={`/users/${user.userId}`}>
                <div className="u-spacing5px">
                  <UserAvatar user={user} size={48} />
                </div>
                {user.fullName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

renderEventItem.propTypes = {
  event: T.object.isRequired,
};

const EventItem = connect(mapStateToProps, mapDispatchToProps)(renderEventItem);

export default EventItem;
