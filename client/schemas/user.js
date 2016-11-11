import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('users', { idAttribute: entity => entity.userId ? entity.userId : entity._id });

export default userSchema;