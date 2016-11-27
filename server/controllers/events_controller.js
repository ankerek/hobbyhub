import _ from 'lodash'

import Event from '../models/event'
import User from '../models/user'
import Category from '../models/category'

const UNSPECIFIED_NAME = 'unspecified';

export function index(req, res, next) {
  Event
    .find().sort({_id: 'desc'})
    .exec((err, events) => {
      if (err) {
        return next(err);
      }
      res.json(events);
    });
}

export function create(req, res, next) {
  const { name, start, end, address, minPeople, maxPeople, description, organizer, category } = req.body;
  let apiEvent = { name, start, end, address, minPeople, maxPeople, description, comments: [], attendees: [] };
  let error = { status: 500, reason: "UnknownError" };

  User
    .findOne({ 'email': organizer }).exec()
    .then(usr => {
      if (!usr) {
        error = { status: 404, reason: "User with given email not found." };
        throw error;
      }
      let organizer = userToAttendee(usr);
      organizer.state = 'ACCEPTED';
      apiEvent.organizer = organizer;
      apiEvent.attendees.push(organizer);
    })
    .then(() => {
      return Category.findOne({ 'name': category }).exec()
    })
    .then((validCategory) => {
      apiEvent.categories = validCategory ? validCategory.name : UNSPECIFIED_NAME;
    })
    .then(() => new Event(apiEvent).save())
    .then((savedEvent) => {
      if (savedEvent) {
        apiEvent._id = savedEvent._id;
        res.json(apiEvent)
      }
    })
    .catch((err) => {
      if (err.name && err.name === "MongoError") {
        error = { status: 400, reason: err.errmsg }
      } else if (err.name && err.name === "ValidationError") {
        error = { status: 400, reason: err.errors[Object.keys(err.errors)[0]].message };
      }
      res.status(error.status).json(error);
    });
}

function userToAttendee(user) {
  let attendee = {};

  attendee.userId = user._id;
  attendee.email = user.email;
  attendee.fullName = `${user.firstName} ${user.lastName}`;
  attendee.averageRating = 85; //TODO: implemented when rating is ready
  attendee.state = 'PENDING';
  attendee.pictureUrl = user.pictureUrl;

  return attendee;
}

export function show(req, res, next) {
  Event
    .findOne({ _id: req.params.eventId })
    .exec((err, event) => {
      if (err) {
        return next(err);
      }
      res.json(event);
    });
}

/**
 * Current search only based on category
 */
export function search(req, res, next) {
  const { categories } = req.body;
  Event
    .find().where('category').in(categories)
    .exec()
    .then(events => {
      res.json(events);
    });
}

export function update(req, res, next) {
  const { eventId } = req.params;
  const { name, start, end, address, minPeople, maxPeople, description, category } = req.body;
  let apiEvent = { name, start, end, address, minPeople, maxPeople, description, comments: [], attendees: [] };
  let error = { status: 500, reason: "UnknownError" };
  let mongooseEvent = {};

  Event
    .findOne({ _id: eventId }).exec()
    .then((event) => {
      if (!event) {
        error = { status: 404, reason: "Event with given eventId not found." };
        throw error;
      } //TODO: easier unwrap?
      mongooseEvent = event;
      mongooseEvent.name = name;
      mongooseEvent.start = start;
      mongooseEvent.end = end;
      mongooseEvent.address = address;
      mongooseEvent.minPeople = minPeople;
      mongooseEvent.maxPeople = maxPeople;
      mongooseEvent.description = description;
      apiEvent._id = eventId;
      apiEvent.comments = mongooseEvent.comments;
      apiEvent.attendees = mongooseEvent.attendees;
    })
    .then(() => {
      return Category.findOne({ 'name': category }).exec()
    })
    .then((validCategory) => {
      mongooseEvent.category = validCategory ? validCategory.name : UNSPECIFIED_NAME;
      apiEvent.category = mongooseEvent.category;
    })
    .then(() => mongooseEvent.save())
    .then((savedEvent) => {
      if (savedEvent) {
        res.json(apiEvent)
      }
    })
    .catch((err) => {
      if (err.name && err.name === "MongoError") {
        error = { status: 400, reason: err.errmsg }
      } else if (err.name && err.name === "ValidationError") {
        error = { status: 400, reason: err.errors[Object.keys(err.errors)[0]].message };
      }
      res.status(error.status).json(error);
    });
}

export function destroy(req, res, next) {
  const { eventId } = req.params;
  let error = { status: 500, reason: "UnknownError" };
  Event
    .findOneAndRemove({ _id: eventId }).exec()
    .then(event => {
      if (!event) {
        error = { status: 404, reason: "Event with given eventId not found." };
        throw error;
      }
      res.json(event)
    })
    .catch(err => {
      res.status(error.status).json(error);
    });
}

export function attend(req, res, next) {
  const { eventId, userId } = req.params;
  let error = { status: 500, reason: "UnknownError" };
  attendLeaveHelper(eventId, userId, true)
    .then((apiEvent) => res.json(apiEvent))
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

export function leave(req, res, next) {
  const { eventId, userId } = req.params;
  let error = { status: 500, reason: "UnknownError" };
  attendLeaveHelper(eventId, userId, false)
    .then((apiEvent) => res.json(apiEvent))
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

export function approve(req, res, next) {
  //TODO: authorization
  //TODO: ask -> return whole json or is status ok?
  const { eventId, userId } = req.params;
  let error = { status: 500, reason: "UnknownError" };
  let mongooseEvent = {};

  return Event
    .findOne({ _id: eventId }).exec()
    .then((validEvent) => {
      if (!validEvent) {
        throw { status: 404, reason: "Event not found", known: true };
      }
      mongooseEvent = validEvent;
      return User.findOne({ _id: userId }).exec();
    })
    .then((validUser) => {
      if (!validUser) {
        error =  { status: 404, reason: "User not found", known: true };
        throw error;
      }
      if (!attending(userId, mongooseEvent)) {
        error = { status: 400, reason: "User is not attending the event.", known: true };
        throw error;
      }
      _.find(mongooseEvent.attendees, attendee => attendee.userId == userId).state = 'ACCEPTED'
      res.json({ 'msg': 'approved' });
    })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

/**
 *
 * @param userId
 * @param apiEvent
 * @returns true if user with given userId is already attending this apiEvent
 */
function attending(userId, apiEvent) {
  return _.find(apiEvent.attendees, attendee => {
    return attendee.userId == userId
  });
}

/**
 * Prevents even more duplicate code for attend/leave handlers
 * @param eventId
 * @param userId
 * @param adding true if we're attempting to add the user, false if removing
 * @returns {Promise.<Event>} modified Event
 */
function attendLeaveHelper(eventId, userId, adding) {
  let apiEvent = {};

  return Event
    .findOne({ _id: eventId }).exec()
    .then((validEvent) => {
      if (!validEvent) {
        throw { status: 404, reason: "Event not found", known: true };
      }
      apiEvent = validEvent;
      return User.findOne({ _id: userId }).exec();
    })
    .then((validUser) => {
      if (!validUser) {
        throw { status: 404, reason: "User not found", known: true };
      }
      let alreadyAttending = attending(userId, apiEvent);

      // add the attendee unles he's already attending the event
      if (adding) {
        if (alreadyAttending) {
          throw { status: 400, reason: "User already attending the event.", known: true };
        }
        apiEvent.attendees.push(userToAttendee(validUser));
        return new Event(apiEvent).save();
      }

      // remove the attendee if he's attending the event
      if (!alreadyAttending) {
        throw { status: 400, reason: "User is not attending the event.", known: true };
      }
      _.remove(apiEvent.attendees, attendee => {
        return attendee.userId == userId
      });
      return new Event(apiEvent).save();
    });
}
