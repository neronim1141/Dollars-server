const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', function(err) {
  console.error(
    'MongoDB connection to <' + config.mongo.uri + '> failed: ' + err
  );
  process.exit(-1);
});

const Message = require('./api/messages/schema');
const User = require('./api/users/schema');
const Topic = require('./api/topics/schema');

var message, user, topic;

User.find({})
  .remove()
  .then(() => {
    return User.create({
      login: 'te1st',
      email: 'hello@hell.satan',
      password: 'test'
    });
  })
  .then(users => {
    user = users;
    return Topic.find({}).remove();
  })
  .then(() => {
    return Topic.create({
      author: user._id,
      title: 'Hell2o'
    });
  })
  .then(topics => {
    topic = topics;
    return Message.find({}).remove();
  })
  .then(() => {
    return Message.create({
      author: user._id,
      topic: topic._id,
      message: 'Hell3o'
    });
  });

for (let i = 0; i < 1000; i++) {
  let newUser = new User({
    login: 'te1st',
    email: 'hello@hell.satan' + i,
    password: 'test'
  });
  console.log(i);
  newUser.saveAsync().then(res => console.log('done'));
}
