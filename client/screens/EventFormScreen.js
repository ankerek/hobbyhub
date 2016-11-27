import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { getAllCategoriesNames } from '../reducers';
import { fetchEvent, createEvent } from '../actions/events';
import { getEvent } from '../reducers/entities';
import EventForm from '../components/EventForm';

const mapStateToProps = (state, { params: { id } }) => ({
  categories: getAllCategoriesNames(state),
  id,
  event: getEvent(state.entities, id),
});

const mapDispatchToProps = {
  fetchEvent,
  createEvent,
};


class EventFormScreenContainer extends React.Component {
  componentDidMount() {
    const { id, event, fetchEvent } = this.props;
    if(id) fetchEvent(id);
  }

  render() {
    const { event, categories, createEvent } = this.props;
    const isEdit = event && event._id;
    return <EventForm onSubmit={createEvent} categories={categories} initialValues={isEdit ? event : null} />
  }
}

// export const EventFormScreenView = ({
//   categories,
//   handleCreateEvent,
// }) => (
//   <EventForm onSubmit={handleCreateEvent} categories={categories} />
// );

// EventFormScreenView.propTypes = {
//   dispatch: T.func.isRequired,
// };

const EventFormScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventFormScreenContainer);

export default EventFormScreen;
