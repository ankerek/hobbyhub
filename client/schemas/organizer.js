import { Schema } from 'normalizr';
import userSchema from './user';

const organizerSchema = new Schema('organizers', {
  idAttribute: entity => entity.user.userId ? entity.user.userId : entity.user._id
});

organizerSchema.define({
  user: userSchema,
});

export default organizerSchema;
