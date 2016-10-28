import mongoose from 'mongoose';

// rating sub-document schema
const ratingSchema = new mongoose.Schema({
  ratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true , //TODO: refs for backend, autoincrement id for api?
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  percent: {
    type: Number,
    required: true,
    min: 0, max: 100,
  },
  additionalText: {
    type: String,
    required: false,
  },
});

// the user document schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  introducation: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  ratings: [ratingSchema],
});

export default mongoose.model('User', UserSchema, 'users');
