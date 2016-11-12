import User from '../models/user';
import passport from '../../configs/passport';

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

export function show(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  })
}

export function auth(req, res, next) {
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
      res
        .status(200)
        .json(user);
    }
  })(req, res, next);
}
