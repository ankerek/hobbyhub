import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { getAllCategoriesNames } from '../reducers';
import { createEvent } from '../actions/events';
import EventForm from '../components/EventForm';

const mapStateToProps = (state) => ({
  categories: getAllCategoriesNames(state),
});

const mapDispatchToProps = {
  handleCreateEvent: createEvent,
};

export const EventFormScreenView = ({
  categories,
  handleCreateEvent,
}) => (
  <EventForm onSubmit={handleCreateEvent} categories={categories} />
);

EventFormScreenView.propTypes = {
  dispatch: T.func.isRequired,
};

const EventFormScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventFormScreenView);

export default EventFormScreen;
