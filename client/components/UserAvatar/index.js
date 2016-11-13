import React from 'react';
import { Link } from 'react-router';
import Rating from 'react-rating';

import './index.scss';

import { bm } from '../../utils/bem';

export const renderUserAvatar = ({
  moduleName = 'UserAvatar',
  user,
  size = 32,
  withRating = false,
} = {}) => (
  <div className={`${bm(moduleName)} u-textCenter`}>
    <Link to={`/users/${user.userId}`}>
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
    </Link>
  </div>
);

const UserAvatar = (renderUserAvatar);

export default UserAvatar;
