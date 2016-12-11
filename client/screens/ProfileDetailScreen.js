import React, { PropTypes as T } from 'react';
import { get as g } from 'lodash';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Well } from 'react-bootstrap';

import { getCurrentUserId, isAuthenticated } from '../reducers/auth';
import { getUserEvents } from '../reducers';
import { getUser } from '../reducers/entities';
import { fetchEvents } from '../actions/events';
import { fetchUser, rateUser, deleteUserRating } from '../actions/users';
import { bm, be } from '../utils/bem';
import EventsGrid from '../components/EventsGrid';
import RateForm from '../components/RateForm';

export const mapStateToProps = (state, { params: { id } }) => {
  const user = getUser(state.entities, id);
  const myId = getCurrentUserId(state);
  const myRating = g(user, 'ratings', []).find(rating => rating.ratedBy === myId) || { percent: 0 };

  const mayRate = g(user, 'userId') !== myId;

  return {
    isAuthenticated: isAuthenticated(state),
    myId,
    user,
    myRating,
    mayRate,
    events: getUserEvents(id)(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  fetch: (id) => dispatch(fetchUser(id)),
  onRateSubmit: (data) => dispatch(rateUser(data)),
  onDeleteRating: (data) => dispatch(deleteUserRating(data)),
  fetchEvents: () => dispatch(fetchEvents()),
});

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onRateSubmit: (data) => dispatchProps.onRateSubmit({
    ...data,
    id: g(stateProps, ['user', 'userId']),
    ratedBy: g(stateProps, ['myId']),
  }),
  onDeleteRating: (data) => dispatchProps.onDeleteRating({
    ...data,
    id: g(stateProps, ['user', 'userId']),
    ratedBy: g(stateProps, ['myId']),
  }),
});

class ProfileDetailContainer extends React.Component {
  componentDidMount() {
    const { params: { id }, fetch, fetchEvents } = this.props;
    fetch(id);
    fetchEvents();
  }

  render() {
    return renderProfileDetailScreen(this.props);
  }
}

export const renderProfileDetailScreen = ({
  user,
  myRating,
  events,
  mayRate,
  onRateSubmit,
  onDeleteRating,
}) => (
  user && events ? (
    <div>
      <Well className="u-maxWidth960px u-centerizeHorizontally u-spacing40px">
        <div className="u-spacing20px">
          <div className={bm('Grid', '1col multiCol:30em alignMiddle fit:30em gutterA20px')}>
            <div className={be('Grid', 'cell')}>
              <img src={user.pictureUrl} alt={user.fullName} width={128} height={128} />
            </div>
            <div className={be('Grid', 'cell')}>
              <p className="u-text30px">
                {user.fullName || `${user.firstName} ${user.lastName}`}
              </p>
              <p>
                Events attended: {events.length}
              </p>
            </div>
            <div className={`${be('Grid', 'cell')} u-text16px`}>
              <div>
                Average Rating:
                <Rating start={0}
                        stop={100}
                        step={20}
                        initialRate={user.averageRating}
                        empty="glyphicon glyphicon-star-empty"
                        full="glyphicon glyphicon-star"
                        readonly
                        className="u-indent5px"
                />
              </div>
            </div>
            {mayRate ? (
              <div className={`${be('Grid', 'cell')} u-text16px u-flexOne`}>
                <div>
                  Rate User:
                  <RateForm onSubmit={onRateSubmit}
                            onDeleteRating={onDeleteRating}
                            hasRating={!!myRating.ratedBy}
                            initialValues={myRating} />
                </div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </Well>
      <div className="u-maxWidth960px u-centerizeHorizontally u-spacing40px">
        <h2 className="u-spacing10px">
          Ratings from People
        </h2>
        {user.ratings && user.ratings.length ? (
          user.ratings.map(rating => (
            <div key={rating._id} className={bm('Grid', '1col multiCol:30em alignMiddle fit:30em gutterA10px')}>
              <div className={be('Grid', 'cell')}>
                <Rating start={0}
                        stop={100}
                        step={20}
                        initialRate={rating.percent}
                        empty="glyphicon glyphicon-star-empty"
                        full="glyphicon glyphicon-star"
                        readonly
                />
              </div>
              <div className={be('Grid', 'cell')}>
                {rating.additionalText}
              </div>
              <div className={be('Grid', 'cell')}>
                |
              </div>
              <div className={be('Grid', 'cell')}>
                <div>
                  rated by
                  <Link className="u-indent5px" to={`/profiles/${rating.ratedBy}`}>{rating.ratedByName}</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>Nobody rated this user yet.</span>
        )}
      </div>
      <div className="u-maxWidth960px u-centerizeHorizontally u-spacing40px">
        <h2 className="u-spacing10px">
          Latest Events
        </h2>
        {events.length ? (
            <EventsGrid events={events} />
          ) : (
            <span>There are no attended events.</span>
          )}
      </div>
    </div>
  ) : (
    <span>Loading...</span>
  )
);

renderProfileDetailScreen.propTypes = {
  user: T.object.isRequired,
};

const ProfileDetailScreen = compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(ProfileDetailContainer);

export default ProfileDetailScreen;
