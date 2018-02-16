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

const subscriptions = {
  messageAdded: {
    type: MessageType,
    subscribe: () => pubsub.asyncIterator(resolvers.Actions.NEW_MESSAGE)
  } // subscribe to changes in a topic
};
module.exports = subscriptions;
