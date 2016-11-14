import { Schema } from 'normalizr';

const categorySchema = new Schema('categories', { idAttribute: '_id' });

export default categorySchema;