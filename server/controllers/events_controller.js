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
      apiEvent.category = validCategory ? validCategory.name : UNSPECIFIED_NAME;
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
  let userProjection = {};

  userProjection.userId = user._id;
  userProjection.email = user.email;
  userProjection.fullName = `${user.firstName} ${user.lastName}`;
  userProjection.averageRating = User.averageRating(user.ratings);
  userProjection.pictureUrl = user.pictureUrl;

  return { user: userProjection, state: 'PENDING'};
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
  const { categories, startBefore, startAfter, empty, full, spotsRemaining } = req.body;
  let query = Event.find().sort({_id: 'desc'});
  if (categories && categories.length) {
    query = query.where('category').in(categories);
  }
  if (startBefore) {
    query = query.where('start').lte(new Date(startBefore));
  }
  if (startAfter) {
    query = query.where('start').gte(new Date(startAfter));
  }
  query.exec().then(events => {
    // this is much easier in JS for now
    let results = events;
    if (empty != null) {
      results = empty ? _.filter(results, e => e.attendees.length == 0) : _.filter(results, e => e.attendees.length > 0);
    }
    if (full != null) {
      results = full ? _.filter(results, e => e.attendees.length == e.maxPeople) : _.filter(results, e => e.attendees.length < e.maxPeople);
    }
    if (spotsRemaining != null) {
      results = _.filter(results, e => e.maxPeople - e.attendees.length == spotsRemaining);
    }
    res.json(results)
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
      _.find(mongooseEvent.attendees, attendee => attendee.user.userId == userId).state = 'ACCEPTED';
    })
    .then(() => mongooseEvent.save())
    .then((savedEvent) => {
      if (savedEvent) {
        res.json(savedEvent);
      }
    })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

export function addComment(req, res, next){
  const { eventId } = req.params;
  const { author, text } = req.body;
  let mongooseEvent = {};
  let apiComment = { };
  let error = { status: 500, reason: 'UnknownError' };

  User
    .findOne({ 'email': author }).exec()
    .then(user => {
      if (!user) {
        error = { status: 404, reason: 'User with given email not found.',known: true };
        throw error;
      }
      apiComment.author = user;
      apiComment.authorName = `${user.firstName} ${user.lastName}`;
      apiComment.text = text;
      apiComment.replies = [];
    })
    .then(() => {
      return Event.findOne({ _id: eventId }).exec()
    })
    .then((validEvent) => {
      if (!validEvent) {
        error = { status: 404, reason: 'Event not found', known: true };
        throw error;
      }
      mongooseEvent = validEvent;
      mongooseEvent.comments.push(apiComment);
    })
    .then(() => mongooseEvent.save())
    .then((savedEvent) => {
          if (savedEvent) {
            res.json(mongooseEvent);
          }
        })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, 'known'));
    });
}

export function addReply(req, res, next){
  const { eventId, commentId } = req.params;
  const { author, text } = req.body;
  let apiComment = { };
  let mongooseEvent = { };
  let error = { status: 500, reason: 'UnknownError' };

  User
    .findOne({ 'email': author }).exec()
    .then(user => {
      if (!user) {
        error = { status: 404, reason: 'User with given email not found.',known: true };
        throw error;
      }
      apiComment.author = user;
      apiComment.authorName = `${user.firstName} ${user.lastName}`;
      apiComment.text = text;
      apiComment.replies = [];
    })
    .then(() => {
      return Event.findOne({ _id: eventId }).exec()
    })
    .then((validEvent) => {
      if (!validEvent) {
        error = { status: 404, reason: 'Event not found', known: true };
        throw error;
      }
      mongooseEvent = validEvent;
      return _.find(mongooseEvent.comments, comment => comment._id == commentId);
    })
    .then((parentComment)=>{
      if(!parentComment){
        error = { status: 404, reason: 'Comment not found', known: true };
        throw error;
      }
      parentComment.replies.push(apiComment);
    })
    .then(() => mongooseEvent.save())
    .then((savedEvent) => {
      if (savedEvent) {
        res.json(mongooseEvent);
      }
    })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, 'known'));
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
    return attendee.user.userId == userId
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
        let newAttendee = userToAttendee(validUser);

        if (apiEvent.organizer.user.userId == userId) {
          newAttendee.state = 'ACCEPTED';
        }
        apiEvent.attendees.push(newAttendee);
        return new Event(apiEvent).save();
      }

      // remove the attendee if he's attending the event
      if (!alreadyAttending) {
        throw { status: 400, reason: "User is not attending the event.", known: true };
      }
      _.remove(apiEvent.attendees, attendee => {
        return attendee.user.userId == userId
      });
      return new Event(apiEvent).save();
    });
}
