import _ from 'lodash'

import Event from '../models/event'
import User from '../models/user'
import Category from '../models/category'

export function index(req, res, next) {
  Event
    .find()
    .exec((err, events) => {
      if (err) {
        return next(err);
      }
      res.json(events);
    });
}

export function create(req, res, next) {
  const { name, start, end, address, minPeople, maxPeople, description, organizer, categories } = req.body;
  let apiEvent = { name, start, end, address, minPeople, maxPeople, description, comments: [], attendees: [] };
  let error = { status: 500, reason: "UnknownError" };

  User
    .findOne({ 'email': organizer }).exec()
    .then(usr => {
      if (!usr) {
        error = { status: 404, reason: "User with given email not found." };
        throw error;
      }
      apiEvent.organizer = userToAttendee(usr)
    })
    .then(() => {
      return Category
        .find().where('name').in(categories)
        .select('name').exec()
    })
    .then((validCategories) => {
      apiEvent.categories = mapCategories(validCategories)
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
  attendee.state = 'ACCEPTED';
  attendee.pictureUrl = user.pictureUrl;

  return attendee;
}

function mapCategories(categoryNames) {
  const defaultCategory = ["unspecified"];

  if (!categoryNames || categoryNames.length == 0) {
    return defaultCategory;
  }
  return _.map(categoryNames, catObj => catObj.name);
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
