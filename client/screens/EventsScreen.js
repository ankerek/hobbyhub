import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';

import { getAllEvents, getCategoryEvents } from '../reducers';
import { fetchEvents } from '../actions/events';
import fetchData from '../components/fetchData';
import SearchFilters from '../components/SearchFilters';
import EventsGrid from '../components/EventsGrid';

export const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps.params;

  const eventsSelector = categoryId ? getCategoryEvents(categoryId) : getAllEvents;

  return {
    events: eventsSelector(state),
  };
};

export const EventsScreenView = ({
  params,
  events,
}) => (
  <div>
    <SearchFilters categoryId={params.categoryId} />
    <h2 className="u-spacing20px">Events</h2>
    <div className="u-spacing80px">
      <EventsGrid events={events} />
    </div>
  </div>
);

EventsScreenView.propTypes = {
  events: T.array.isRequired,
};

const EventsScreen = compose(
  connect(mapStateToProps),
  fetchData(fetchEvents),
)(EventsScreenView);

export default EventsScreen;
