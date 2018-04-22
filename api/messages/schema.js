var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creationTime: {
    type: Date,
    default: Date.now
  },
  message: { type: String }
});

exports.MessageSchema = MessageSchema;
const Message = mongoose.model('Message', MessageSchema, 'Message');

module.exports = Message;
