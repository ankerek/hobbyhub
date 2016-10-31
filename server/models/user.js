import mongoose from 'mongoose';

// rating sub-document schema
const ratingSchema = new mongoose.Schema({
  ratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    default: Date.now,
    required: true,
  },
  percent: {
    type: Number,
    min: 0, max: 100,
    required: true,
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
  pictureUrl: {
    type: String,
    required: false,
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
