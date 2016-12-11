import React from 'react';
import { bm, be } from '../../utils/bem';
import EventItem from '../EventItem';

export const renderEventsGrid = ({
  events,
  mayHide = false,
} = {}) => (
  <div className={bm('Grid', '1col multiCol:35em 2col:35em gutterA10px wrap')}>
    {events.map(event => (
      <div key={event._id} className={`${be('Grid', 'cell')} u-flexRow u-alignIStretch`}>
        <EventItem className="u-size1of1" event={event} mayHide={mayHide} />
      </div>
    ))}
  </div>
);

const EventsGrid = (renderEventsGrid);

export default EventsGrid;
