import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { createEvent } from '../actions/events';
import EventForm from '../components/EventForm';

const mapStateToProps = null;

const mapDispatchToProps = {
  handleCreateEvent: createEvent,
};

export const EventFormScreenView = ({
  handleCreateEvent,
}) => (
  <EventForm onSubmit={handleCreateEvent} />
);

EventFormScreenView.propTypes = {
  dispatch: T.func.isRequired,
};

const EventFormScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventFormScreenView);

export default EventFormScreen;
