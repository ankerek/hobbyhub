import React, { PropTypes as T } from 'react';
import { get as g } from 'lodash';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import compose from 'compose-function';
import { Well } from 'react-bootstrap';

import { getCurrentUserId, isAuthenticated } from '../reducers/auth';
import { getUserEvents } from '../reducers';
import { getUser } from '../reducers/entities';
import { fetchEvents } from '../actions/events';
import { fetchUser, updateUser, rateUser, deleteUserRating } from '../actions/users';
import { bm, be } from '../utils/bem';
import EventsGrid from '../components/EventsGrid';
import RateForm from '../components/RateForm';

/*eslint-disable */
class AvatarDropzone extends React.Component {
  render() {
    const { updateUser } = this.props;
    return (
      <div>
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={(files) => {updateUser({file: files[0]})}} style={{display:'none'}}>
        </Dropzone>
        <button type="button" onClick={() => { this.dropzone.open()} }>
          Upload avatar
        </button>
      </div>
    )
  }
}
/*eslint-enable */


export const mapStateToProps = (state, { params: { id } }) => {
  const user = getUser(state.entities, id);
  const myId = getCurrentUserId(state);
  const myRating = g(user, 'ratings', []).find(rating => rating.ratedBy === myId) || { percent: 0 };
  const isMine = g(user, '_id') === myId;
  const mayRate = g(user, '_id') !== myId;

  return {
    isAuthenticated: isAuthenticated(state),
    myId,
    isMine,
    user,
    myRating,
    mayRate,
    events: getUserEvents(id)(state),
  };
};

export const mapDispatchToProps = (dispatch) => ({
  fetch: (id) => dispatch(fetchUser(id)),
  updateUser: (data) => dispatch(updateUser(data)),
  onRateSubmit: (data) => dispatch(rateUser(data)),
  onDeleteRating: (data) => dispatch(deleteUserRating(data)),
  fetchEvents: (data) => dispatch(fetchEvents(data)),
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
    fetchEvents({ withFilters: false });
  }

  render() {
    return renderProfileDetailScreen(this.props);
  }
}

export const renderProfileDetailScreen = ({
  isAuthenticated,
  user,
  myRating,
  events,
  isMine,
  mayRate,
  onRateSubmit,
  onDeleteRating,
  updateUser,
}) => (
  user && events ? (
    <div className="ProfileDetailScreen">
      <Well className="u-maxWidth960px u-centerizeHorizontally u-spacing40px">
        <div className="u-spacing20px">
          <div className={bm('Grid', '1col multiCol:30em alignMiddle fit:30em gutterA20px wrap')}>
            <div className={be('Grid', 'cell')}>
              <img src={user.pictureUrl} alt={user.fullName} width={128} height={128} />
              { isMine && <AvatarDropzone updateUser={updateUser} /> }
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
            {isAuthenticated && mayRate ? (
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
            <EventsGrid events={events} mayHide={isMine} />
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
