var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TopicSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    creationTime: {
      type: Date,
      default: Date.now
    },
    title: { type: String }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const Topic = mongoose.model('Topic', TopicSchema, 'Topic');

module.exports = Topic;
