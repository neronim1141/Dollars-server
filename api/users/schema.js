const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String },
  email: { type: String },
  role: {
    type: String,
    default: 'user'
  },
  creationTime: {
    type: Date,
    default: Date.now
  },
  password: { type: String, select: false },
  salt: { type: String, select: false }
});

//#region Validators
// Validate empty email
UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('password').validate(function(password) {
  return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate(function(value, respond) {
  let self = this;
  return this.constructor
    .findOne({ email: value })
    .then(function(user) {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch(function(err) {
      throw err;
    });
}, 'The specified email address is already in use.');

const validatePresenceOf = function(value) {
  return value && value.length;
};

//#endregion

//#region pre-save hook
UserSchema.pre('save', function(next) {
  // Handle new passwords
  if (this.isModified('password')) {
    if (!validatePresenceOf(this.password)) {
      next(new Error('Invalid password'));
    }

    // Make salt with a callback
    let _this = this;
    this.makeSalt(function(saltErr, salt) {
      if (saltErr) {
        next(saltErr);
      }
      _this.salt = salt;

      _this.encryptPassword(_this.password, function(
        encryptErr,
        hashedPassword
      ) {
        if (encryptErr) {
          next(encryptErr);
        }
        _this.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});
//#endregion

//#region Methods
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate: function(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    let _this = this;
    this.encryptPassword(password, function(err, pwdGen) {
      if (err) {
        callback(err);
      }

      if (_this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt: function(byteSize, callback) {
    let defaultByteSize = 10;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    if (!callback) {
      return bcrypt.genSalt(byteSize);
    }

    return bcrypt.genSalt(byteSize, (err, salt) => {
      if (err) callback(err);
      return callback(null, salt);
    });
  },
  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, callback) {
    if (!password || !this.salt) {
      return null;
    }

    if (!callback) {
      bcrypt.hash(password, this.salt);
    }
    return bcrypt.hash(password, this.salt, (err, hash) => {
      if (err) callback(err);
      return callback(null, hash);
    });
  }
};
//#endregion

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
