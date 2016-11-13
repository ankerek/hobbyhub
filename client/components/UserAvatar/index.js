import React from 'react';

import './index.scss';

import { bm } from '../../utils/bem';

export const renderUserAvatar = ({
  moduleName = 'UserAvatar',
  user,
  size = 32,
} = {}) => (
  <div className={bm(moduleName)}>
    <img src={user.pictureUrl} alt={user.fullName} width={size} height={size} />
  </div>
);

const UserAvatar = (renderUserAvatar);

export default UserAvatar;
