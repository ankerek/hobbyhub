import User, {Token} from '../models/user';
import Event from '../models/event'
import passport from '../../configs/passport';
import _ from 'lodash'

export function index(req, res, next) {
  User.find((err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users);
  })
}

export function create(req, res, next) {
  passport.authenticate('local-signup', {
    session: false
  }, (err, user, info) => {
    if (err) {
      res
        .status(500)
        .json(err);
    } else if (info) {
      res
        .status(401)
        .json(info);
    } else {
      res
        .status(200)
        .json(user);
    }
  })(req, res, next);
}

export function updateRating(req, res, next) {
  const { userId } = req.params;
  const { percent, text, ratedBy } = req.body;
  let error = { status: 500, reason: "UnknownError" };

  return User
    .findOne({ _id: userId})
    .then(validUser => {
      if (!validUser) {
        throw { status: 404, reason: "User not found", known: true };
      }
      return ratingHelper(validUser, percent, text, ratedBy, false);
    })
    .then(savedUser => {
      if (savedUser) {
        updateAverageRatings(userId, User.averageRating(savedUser.ratings));
        res.json(savedUser);
      }
    })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

export function deleteRating(req, res, next) {
  const { userId } = req.params;
  const { ratedBy } = req.body;
  let error = { status: 500, reason: "UnknownError" };

  return User
    .findOne({ _id: userId})
    .then(validUser => {
      if (!validUser) {
        throw { status: 404, reason: "User not found", known: true };
      }
      return ratingHelper(validUser, null, null, ratedBy, true);
    })
    .then(savedUser => {
      if (savedUser) {
        updateAverageRatings(userId, User.averageRating(savedUser.ratings));
        res.json(savedUser);
      }
    })
    .catch((err) => {
      if (err.known) {
        error = err;
      }
      res.status(error.status).json(_.omit(error, "known"));
    });
}

function ratingHelper(validUser, percent, text, ratedBy, deleting) {
  let currentRatings = _.filter(validUser.ratings, rating  => rating.ratedBy != ratedBy);
  if (!deleting) {
    let newRating = { ratedBy: ratedBy, timestamp: Date.now(), percent: percent, additionalText: text };
    currentRatings.push(newRating);
  }
  validUser.ratings = currentRatings;
  return validUser.save();
}

function updateAverageRatings(userId, avgRating) {
  Event
    .find().exec()
    .then(events => {
      _.forEach(events, event => {
        let changed = false;
        if (event.organizer.userId == userId) {
          event.organizer.averageRating = avgRating;
          changed = true;
        }
        _.forEach(event.attendees, attendee => {
          if (attendee.user.userId == userId) {
            attendee.user.averageRating = avgRating;
            changed = true;
          }
        });
        if (changed) {
          console.log("updating event", event);
          event.save();
        }
      })
    })
}

export function show(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
}

export function login(req, res, next) {
  passport.authenticate('local-signin', {
    session: false
  }, (err, user, info) => {
    if (err) {
      res
        .status(500)
        .json(err);
    } else if (info) {
      res
        .status(401)
        .json(info);
    } else {
      User.createUserToken(user.email, (err, usersToken) => {
        console.log('token generated: ' + usersToken);
        if (err) {
          res.json({error: 'Issue generating token'});
        } else {
          res.json({
            user,
            token: usersToken,
          });
        }
      });
    }
  })(req, res, next);
}

export function auth(req, res, next) {
  const incomingToken = req.headers['x-auth-token'];
  if (incomingToken) {
    const decoded = User.decode(incomingToken);
    console.log('incomingToken: ' + incomingToken);
    if (decoded && decoded.email) {
      User.findUser(decoded.email, incomingToken, (err, user) => {
        if (err) {
          res
            .status(401)
            .json({error: 'Issue finding user.'});
        } else {
          if (Token.hasExpired(user.token.date_created)) {
            res
              .status(401)
              .json({error: 'Token expired. You need to log in again.'});
          } else {
            res
              .status(200)
              .json(user);
          }
        }
      });
    } else {
      res
        .status(401)
        .json({error: 'Issue decoding incoming token.'});
    }
  } else {
    res
      .status(401)
      .json({error: 'No token provided.'});
  }
}

export function logout(req, res, next) {
  const incomingToken = req.headers['x-auth-token'];
  console.log('LOGOUT: incomingToken: ' + incomingToken);
  if (incomingToken) {
    const decoded = User.decode(incomingToken);
    if (decoded && decoded.email) {
      User.invalidateUserToken(decoded.email, (err, user) => {
        if (err) {
          res
            .status(401)
            .json({error: 'Issue finding user (in unsuccessful attempt to invalidate token).'});
        } else {
          res
            .status(200)
            .json({message: 'logged out'});
        }
      });
    } else {
      res
        .status(401)
        .json({error: 'Issue decoding incoming token.'});
    }
  } else {
    res
      .status(401)
      .json({error: 'No token provided.'});
  }
}

export function isAuthenticated(req, res, next) {
  const incomingToken = req.headers['x-auth-token'];
  if (incomingToken) {
    const decoded = User.decode(incomingToken);
    console.log('incomingToken: ' + incomingToken);
    if (decoded && decoded.email) {
      User.findUser(decoded.email, incomingToken, (err, user) => {
        if (err) {
          res
            .status(401)
            .json({error: 'Issue finding user.'});
        } else {
          if (Token.hasExpired(user.token.date_created)) {
            res
              .status(401)
              .json({error: 'Token expired. You need to log in again.'});
          } else {
            next();
          }
        }
      });
    } else {
      res
        .status(401)
        .json({error: 'Issue decoding incoming token.'});
    }
  } else {
    res
      .status(401)
      .json({error: 'No token provided.'});
  }

}
