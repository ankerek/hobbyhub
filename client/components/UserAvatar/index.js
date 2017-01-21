import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { navigate } from '../../actions/router';
import anonymous from '../../static/img/user-avatars/anonymous.svg';

import './index.scss';

import { bm } from '../../utils/bem';

export const mapStateToProps = null;

export const mapDispatchToProps = {
  navigate,
};

function dontPropagate(fn) {
  return function(e) {
    e.stopPropagation();
    fn();
  }
}

export const renderUserAvatar = ({
  moduleName = 'UserAvatar',
  user,
  size = 32,
  withRating = false,
  reserved = false,
  navigate,
} = {}) => (
  <div className={`${bm(moduleName)} u-textCenter u-isActionable`}
       onClick={dontPropagate(() => navigate({ pathname: `/profiles/${user.userId}` }))}
  >
    <div className="u-spacing5px">
      <img src={reserved ? anonymous : user.pictureUrl} alt={reserved ? 'anonymous' : user.fullName} width={size} height={size} />
    </div>
    <p className="u-spacing5px">
      {reserved ? 'Reserved' : user.fullName}
    </p>
    {withRating ? (
      <p className="u-colorPrimary">
        <Rating start={0}
                stop={100}
                step={20}
                initialRate={user.averageRating}
                empty="glyphicon glyphicon-star-empty"
                full="glyphicon glyphicon-star"
                readonly
        />
      </p>
    ) : null}
  </div>
);

const UserAvatar = connect(mapStateToProps, mapDispatchToProps)(renderUserAvatar);

export default UserAvatar;
