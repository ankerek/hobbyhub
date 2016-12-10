import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { navigate } from '../../actions/router';

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
  navigate,
} = {}) => (
  <div className={`${bm(moduleName)} u-textCenter u-isActionable`}
       onClick={dontPropagate(() => navigate({ pathname: `/profiles/${user.userId}` }))}
  >
    <div className="u-spacing5px">
      <img src={user.pictureUrl} alt={user.fullName} width={size} height={size} />
    </div>
    <p className="u-spacing5px">
      {user.fullName}
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
