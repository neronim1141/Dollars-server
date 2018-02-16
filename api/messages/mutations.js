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
const mutations = {
  createMessage: {
    type: MessageType,
    args: {
      author: {
        type: new GraphQLNonNull(GraphQLString)
      },
      topic: {
        type: new GraphQLNonNull(GraphQLString)
      },
      message: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createMessage
  },
  removeMessage: {
    type: MessageType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteMessage
  },
  updateMessage: {
    type: MessageType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      message: { type: GraphQLString }
    },
    resolve: resolvers.updateMessage
  }
};

module.exports = mutations;
