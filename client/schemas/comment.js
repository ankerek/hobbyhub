import { Schema, arrayOf } from 'normalizr';

const commentSchema = new Schema('comments', { idAttribute: '_id' });

export default commentSchema;