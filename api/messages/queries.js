const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const MessageType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  message: {
    type: MessageType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  messages: {
    type: new GraphQLList(MessageType),
    args: {
      first: {
        type: GraphQLInt
      },
      offset: {
        type: GraphQLInt
      }
    },
    resolve: resolvers.getList
  }
};
module.exports = queries;
