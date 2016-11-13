import React from 'react';

import './index.scss';

import anonymousAvatars from '../../constants/anonymousAvatars';
import { bm, } from '../../utils/bem';

const randomGenerator = (min, max) => Math.floor(Math.random() * max) + min;

export const renderUserAvatar = ({
  moduleName = 'UserAvatar',
  user,
  size = 32,
} = {}) => {
  const avatarSrc = anonymousAvatars[randomGenerator(0, anonymousAvatars.length - 1)];

  return (
    <div className={bm(moduleName)}>
      <img src={avatarSrc} alt={user.fullName} width={size} height={size} />
    </div>
  );
};

const UserAvatar = (renderUserAvatar);

export default UserAvatar;
