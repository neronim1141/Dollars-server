const Message = require('../messages/schema');
const Topic = require('../topics/schema');

//#region Read object
module.exports.getOne = (parentValue, args) => {
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
module.exports.getMessages = (parentValue, args) => {
  return Message.findAsync({ topic: parentValue.id }, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => res);
};

//#endregion

//#region Create Update Delete
module.exports.createTopic = (parentValue, args) => {
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
module.exports.updateTopic = (parentValue, args) => {
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
module.exports.deleteTopic = (parentValue, args) => {
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
