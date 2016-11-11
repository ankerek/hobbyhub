import User from '../models/user'

export function index(req, res, next) {
  User.find((err,users) => {
          if(err) {
            return next(err);
          }
        res.json(users);
    })
}

export function create(req, res, next) {
  const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
          return next(err);
        }
        res.json(user);
    });
}

export function show(req, res, next) {
  User.findById(req.params.userId, (err, user) => {
        if (err) {
          return next(err);
        }
        res.json(user);
      })
}

export function auth(req, rest, next) {
  //TODO: passport, hardcode? whatever
}
