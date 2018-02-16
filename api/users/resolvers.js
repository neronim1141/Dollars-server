const User = require('./schema');
const Message = require('../messages/schema');
const Topic = require('../topics/schema');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return User.findByIdAsync(args.id, 'id login role email').then(res => {
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  return User.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    return res;
  });
};
module.exports.getProfile = (parentValue, args, context) => {
  if (!context.user) throw 'not logged';
  return User.findById(args.id).then(res => {
    return res;
  });
};
//#endregion

//#region Read fragments
module.exports.getMessages = (parentValue, args) => {
  return Message.findAsync({ author: parentValue.id }, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => res);
};
module.exports.getTopics = (parentValue, args) => {
  return Topic.findAsync({ author: parentValue.id }, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => res);
};
//#endregion

//#region Create Update Delete
module.exports.createUser = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newUser = new User({
      login: args.login,
      password: args.password,
      email: args.email
    });

    newUser
      .saveAsync((err, res) => {
        if (err) throw err;
        resolve(res);
      })
      .catch(err => {
        if (config.mongo.debug.errors) console.log(err);
        reject(err);
      });
  });
};
module.exports.updateUser = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdateAsync(args.id, args)
      .then(res => {
        if (!res) throw 'not found';
        if (config.mongo.debug.fields) console.log({ update: res });
        resolve({ res, ...args });
      })
      .catch(err => {
        if (config.mongo.debug.errors) console.log({ update: err });
        reject(err);
      });
  });
};
module.exports.deleteUser = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    User.findById(args.id)
      .then(user => {
        if (!user) {
          throw 'Not Found';
        }
        user
          .remove((err, res) => {
            if (err) throw err;
            resolve(res);
          })
          .catch(err => {
            if (config.mongo.debug.errors) console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        if (config.mongo.debug.errors) console.log(err);
        reject(err);
      });
  });
};
//#endregion

//#region authenticate
module.exports.login = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      login: args.login.toLowerCase()
    })
      .select('id login email role password salt')
      .then(function(user) {
        if (!user) {
          reject('This User is not registered.');
        }

        user.authenticate(args.password, function(authError, authenticated) {
          if (authError) {
            reject(authError);
          }
          if (!authenticated) {
            reject('This password is not correct.');
          } else {
            if (config.mongo.debug.fields) console.log(user);
            let token = jwt.sign(
              { _id: user._id, role: user.role },
              config.secrets.session,
              {
                expiresIn: 60 * 5 * 60
              }
            );

            resolve({ user: user, token: token });
          }
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
