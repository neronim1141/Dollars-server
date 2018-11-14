const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const MessageType = require('./type');
const resolvers = require('./resolvers');
const pubsub = require('../subscriptions');
const {withFilter}= require('graphql-subscriptions'); 
const subscriptions = {
  messageAdded: {
    type: MessageType,
    args: {
      topic: {
        type: GraphQLString
      }
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator(resolvers.Actions.NEW_MESSAGE),
       (payload, args) => {
          if(args.topic) return payload.topicID===args.topic;
          return true;
    })
    }
  } // subscribe to changes in a topic
module.exports = subscriptions;
