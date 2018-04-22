const Message = require('../messages/schema');
const User = require('../users/schema');
const pubsub = require('../subscriptions');
const Actions = {
  NEW_MESSAGE: 'new Message'
};
module.exports.Actions = Actions;
//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Message.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  return Message.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Read fragments
module.exports.getAuthor = (parentValue, args, context) => {
  return User.findById(parentValue.author).then(res => res);
};
//#endregion

//#region Create Update Delete
module.exports.createMessage = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  var newMessage = new Message({
    author: args.author,
    topic: args.topic,
    message: args.message
  });

  return newMessage
    .save((err, res) => {
      if (err) throw err;
      pubsub.publish(Actions.NEW_MESSAGE, { messageAdded: newMessage });
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
module.exports.updateMessage = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  return Message.findByIdAndUpdate(args.id, args)
    .then(res => {
      if (!res) throw 'not found';
      console.log(res);
      return { res, ...args };
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
module.exports.deleteMessage = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  var message = Message.findById(args.id).catch(err => {
    console.log(err);
    return err;
  });

  return message
    .remove((err, res) => {
      if (err) throw err;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
//#endregion
