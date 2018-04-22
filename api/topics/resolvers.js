const Message = require('../messages/schema');
const Topic = require('../topics/schema');
const User = require('../users/schema');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Topic.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Topic.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Read fragments
module.exports.getMessages = (parentValue, args, context) => {
  return Message.findAsync({ topic: parentValue.id }, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => res);
};
module.exports.getAuthor = (parentValue, args, context) => {
  return User.findById(parentValue.author).then(res => res);
};
//#endregion

//#region Create Update Delete
module.exports.createTopic = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  var newTopic = new Topic({ author: args.author, title: args.title });

  return newTopic
    .save((err, res) => {
      if (err) throw err;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
module.exports.updateTopic = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  return Topic.findByIdAndUpdate(args.id, args)
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
module.exports.deleteTopic = (parentValue, args, context) => {
  if (!context.user) {
    return new Error('must be logged');
  }
  var topic = Topic.findById(args.id).catch(err => {
    console.log(err);
    return err;
  });

  return topic
    .remove((err, res) => {
      if (err) throw err;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
//#endregion
