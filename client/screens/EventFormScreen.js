import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { createEvent } from '../actions/events';
import EventForm from '../components/EventForm';

export const EventFormScreenView = ({
  dispatch,
}) => (
  <EventForm onSubmit={(data) => dispatch(createEvent(data))} />
);

EventFormScreenView.propTypes = {
  dispatch: T.func.isRequired,
};

const EventFormScreen = compose(
  connect(),
)(EventFormScreenView);

export default EventFormScreen;
