import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

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
    unique: true,
    required: true,
  },
  password: { //TODO: temporary plaintext simple password
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
  introduction: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  ratings: [ratingSchema],
});

UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema, 'users');
