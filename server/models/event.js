import mongoose from 'mongoose';

// reused for organiser and individual attendees
const attendeeSchema = new mongoose.Schema({
  _id: false,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    required: false,
    min: 0, max: 100,
  },
  state: {
    type: String,
    enum: ['PENDING', 'ACCEPTED'], default: 'PENDING',
    required: true,
  },
});

// recursive comment schema
const commentSchema = new mongoose.Schema();

commentSchema.add({
  _id: false,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  replies: [commentSchema],
});


// the actual event schema
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organizer: {
    type: attendeeSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: [],
    required: true,
  }],
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  minPeople: {
    type: Number,
    required: true,
    min: 2
  },
  maxPeople: {
    type: Number,
    required: true,
    min: 2,
  },
  attendees: [attendeeSchema],
  comments: [commentSchema],
});

export default mongoose.model('Event', EventSchema, 'events');
