import {Strategy as LocalStrategy} from 'passport-local';
import User from '../server/models/user';
import passport from 'passport';

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  process.nextTick(() => {
    User.findOne({
      'email': email
    }, (err, user) => {
      if (err) {
        return done(err)
      };
      if (user) {
        return done(null, false, {message: 'That email is already taken.'});
      } else {
        const newUser = new User(req.body);
        newUser.password = User.generateHash(password);
        newUser.pictureUrl = User.generatePictureUrl(1,40);
        newUser.save((err) => {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  });
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({
    'email': email
  }, (err, user) => {
    if (err) 
      return done(err);
    if (!user) 
      return done(null, false, {message: 'No user found.'});
    if (!user.validPassword(password)) 
      return done(null, false, {message: 'Oops! Wrong password.'});
    return done(null, user);
  });
}));

export default passport;
