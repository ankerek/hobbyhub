import React from 'react';
import { bm, be } from '../../utils/bem';
import EventItem from '../EventItem';

export const renderEventsGrid = ({
  events,
} = {}) => (
  <div className={bm('Grid', 'multiCol 2col gutterA10px wrap')}>
    {events.map(event => (
      <div className={`${be('Grid', 'cell')} u-flexRow u-alignIStretch`}>
        <EventItem key={event._id} className="u-size1of1" event={event} />
      </div>
    ))}
  </div>
);

const EventsGrid = (renderEventsGrid);

export default EventsGrid;
