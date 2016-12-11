import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import compose from 'compose-function';
import { getAllCategoriesNames } from '../reducers';
import { fetchEvent, createEvent } from '../actions/events';
import { getEvent } from '../reducers/entities';
import EventForm from '../components/EventForm';

const formatEventDateTime = (event) => {
  event.start = moment(event.start).format('L LT');
  event.end =  moment(event.end).format('L LT');
  return event;
}

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
    if(id && !event._id) fetchEvent(id);
  }

  render() {
    const { event, categories, createEvent } = this.props;
    const isEdit = event && event._id;

    return <EventForm onSubmit={createEvent} categories={categories} initialValues={isEdit ? formatEventDateTime(event) : null} />
  }
}

const EventFormScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventFormScreenContainer);

export default EventFormScreen;
