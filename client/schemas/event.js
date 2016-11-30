import { Schema, arrayOf } from 'normalizr';
import organizerSchema from './organizer';
import attendeeSchema from './attendee';
import commentSchema from './user';

const eventSchema = new Schema('events', { idAttribute: '_id' });

eventSchema.define({
  organizer: organizerSchema,
  attendees: arrayOf(attendeeSchema),
  comments: arrayOf(commentSchema),
});

export default eventSchema;
