import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
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
    formValues: state.search.form,
  };
};

export const mapDispatchToProps = {
  fetchEvents,
  searchEvents,
  filterByCategory,
  resetSearchEvents,
  destroyForm: destroy,
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
  formValues,
  searchEvents,
  filterByCategory,
  resetSearchEvents,
  destroyForm,
}) => (
  <div>
    <Well>
      {console.log(formValues)}
      <CategoryFilter onClick={filterByCategory} />
      <SearchForm onSubmit={searchEvents} initialValues={formValues} resetForm={() => {
        resetSearchEvents();
        destroyForm('searchEvents');
        searchEvents();
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
