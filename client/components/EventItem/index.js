import React, { PropTypes as T } from 'react';
import { FormattedTime } from 'react-intl';
import { connect } from 'react-redux';
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
        {event.category ? (
          <div className="u-spacing10px">
            <CategoryIcon category={{ name: event.category }} />
          </div>
        ) : null}
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
          ({event.attendees.length}/{event.maxPeople}) <span className="EventItem-title">{event.name}</span>
        </h3>
        <p className="u-spacing5px">
          <strong>
            <FormattedTime day="numeric" month="long" year="numeric" time="long" value={event.start} />
          </strong>
          <span className="u-indent5px">-</span>
          <span className="u-indent5px">{event.address}</span>
        </p>
        <p className="u-spacing10px">
          Minimum players: <strong>{event.minPeople}</strong>
        </p>
        <div className={bm('Grid', 'multiCol wrap 3col 4col:40em gutterH5px')}>
          {event.attendees.map(user => (
            <div key={user.userId} className={`${be('Grid', 'cell')} u-textCenter`}>
              <UserAvatar user={user} size={48} />
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
