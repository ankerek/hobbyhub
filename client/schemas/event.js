import { Schema, arrayOf } from 'normalizr';
import userSchema from './user';
import commentSchema from './user';

const eventSchema = new Schema('events', { idAttribute: '_id' });

eventSchema.define({
  organizer: userSchema,
  attendees: arrayOf(userSchema),
  comments: arrayOf(commentSchema),
});

export default eventSchema;