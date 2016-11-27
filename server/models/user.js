import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
import config from '../../configs';

const TokenSchema = new mongoose.Schema({
  token: {
    type: String
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});
TokenSchema.statics.hasExpired = (created) => {
  const now = new Date();
  const diff = (now.getTime() - created);
  return diff > config.ttl;
};

const TokenModel = mongoose.model('Token', TokenSchema);

// rating sub-document schema
const ratingSchema = new mongoose.Schema({
  ratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  percent: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  additionalText: {
    type: String,
    required: false
  }
});

// the user document schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: { //TODO: temporary plaintext simple password
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  pictureUrl: {
    type: String,
    required: false
  },
  introduction: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  ratings: [ratingSchema],
  token: {
    type: Object
  },
  resetToken: {
    type: String
  },
  resetTokenExpiresMillis: {
    type: Number
  }
});

UserSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.encode = function(data) {
  return jwt.encode(data, 'Team-8-HobbyHub');
};

UserSchema.statics.decode = function(data) {
  return jwt.decode(data, 'Team-8-HobbyHub');
};

UserSchema.statics.findUserByEmailOnly = function(email, cb) {
  this.findOne({
    email: email
  }, (err, user) => {
    if (err || !user) {
      cb(err, null);
    } else {
      cb(false, user);
    }
  });
};

UserSchema.statics.findUser = function(email, token, cb) {
  this.findOne({
    email: email
  }, (err, user) => {
    if (err || !user) {
      cb(err, null);
    } else if (user.token && user.token.token && token === user.token.token) {
      cb(false, user);
    } else {
      cb(new Error('Token does not exist or does not match.'), null);
    }
  });
};

UserSchema.statics.createUserToken = function(email, cb) {
  const self = this;
  this.findOne({
    email: email
  }, (err, user) => {
    if (err || !user) {
      console.log('err');
    }
    //Create a token and add to user and save
    const token = self.encode({email: email});
    user.token = new TokenModel({token: token});
    user.save((err, user) => {
      if (err) {
        cb(err, null);
      } else {
        console.log('About to cb with usr.token.token: ' + user.token.token);
        cb(false, user.token.token); //token object, in turn, has a token property :)
      }
    });
  });
};

UserSchema.statics.invalidateUserToken = function(email, cb) {
  this.findOne({
    email: email
  }, (err, user) => {
    if (err || !user) {
      console.log('err');
    }
    user.token = null;
    user.save((err, user) => {
      if (err) {
        cb(err, null);
      } else {
        cb(false, 'removed');
      }
    });
  });
};

UserSchema.statics.generateResetToken = function(email, cb){
  console.log('in generateResetToken....');
  this.findUserByEmailOnly(email, (err, user) => {
    if (err) {
      cb(err, null);
    } else if (user) {
      //Generate reset token and URL link; also, create expiry for reset token
      user.resetToken = crypto
        .randomBytes(32)
        .toString('hex');
      const now = new Date();
      const expires = new Date(now.getTime() + config.authExpiration).getTime();
      user.resetTokenExpiresMillis = expires;
      user.save();
      cb(false, user);
    } else {
      // TODO: This is not really robust and we should probably return an error code
      // or something here
      cb(new Error('No user with that email found.'), null);
    }
  });
};

export {TokenModel as Token};
export default mongoose.model('User', UserSchema, 'users');
