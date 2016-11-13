import React, { PropTypes as T } from 'react';

import { bm } from '../../utils/bem';
import eventPosters from '../../constants/eventPosters';

import './index.scss';

export const renderEventPoster = ({
  moduleName = 'EventPoster',
  modifiers = '',
  category,
}) => (
  <img className={bm(moduleName, modifiers)} src={eventPosters[category]} />
);

renderEventPoster.propTypes = {
  category: T.string.isRequired,
};

const EventPoster = (renderEventPoster);

export default EventPoster;
