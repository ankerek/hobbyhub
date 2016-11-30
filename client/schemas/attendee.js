import { Schema } from 'normalizr';
import userSchema from './user';

const attendeeSchema = new Schema('attendees', {
  idAttribute: entity => entity.user.userId ? entity.user.userId : entity.user._id
});

attendeeSchema.define({
  user: userSchema,
});

export default attendeeSchema;
