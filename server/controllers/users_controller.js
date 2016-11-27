import User, {Token} from '../models/user';
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
  }
}
