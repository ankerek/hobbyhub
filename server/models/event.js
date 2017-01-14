import mongoose from 'mongoose';

// reused for organiser and individual attendees
const attendeeSchema = new mongoose.Schema({
  _id: false,
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
      min: 0, max: 100,
      required: false,
    },
    pictureUrl: {
      type: String,
      required: false,
    },
  },
  state: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING',
    required: true,
  },
});

// recursive comment schema
const commentSchema = new mongoose.Schema();

commentSchema.add({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
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
    unique: true,
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
  category: {
    type: String,
    default: 'unspecified',
    required: true,
  },
  start: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end: {
    type: Date,
    required: true,
    default: Date.now
  },
  address: {
    type: String,
    required: true
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
  spotsReserved: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  attendees: [attendeeSchema],
  comments: [commentSchema],
});

export default mongoose.model('Event', EventSchema, 'events');
