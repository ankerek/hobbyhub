import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import compose from 'compose-function';

import { getAllEvents, getCategoryEvents } from '../reducers';
import { fetchEvents, searchEvents, filterByCategory, resetSearchEvents } from '../actions/events';
import { Well } from 'react-bootstrap';
import CategoryFilter from '../components/CategoryFilter';
import SearchForm from '../components/SearchForm';
import EventsGrid from '../components/EventsGrid';

export const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps.params;

  const eventsSelector = categoryId ? getCategoryEvents(categoryId) : getAllEvents;

  return {
    events: eventsSelector(state),
  };
};

export const mapDispatchToProps = {
  fetchEvents,
  searchEvents,
  filterByCategory,
  resetSearchEvents,
  resetForm: reset,
};

class EventsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return renderEventsScreen(this.props);
  }
}

export const renderEventsScreen = ({
  events,
  searchEvents,
  filterByCategory,
  resetSearchEvents,
  resetForm,
}) => (
  <div>
    <Well>
      <CategoryFilter onClick={filterByCategory} />
      <SearchForm onSubmit={searchEvents} resetForm={() => {
        resetForm('searchEvents');
        resetSearchEvents();
      }} />
    </Well>
    <h2 className="u-spacing20px">Events</h2>
    <div className="u-spacing80px">
      <EventsGrid events={events} />
    </div>
  </div>
);

renderEventsScreen.propTypes = {
  events: T.array.isRequired,
};

const EventsScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventsContainer);

export default EventsScreen;
