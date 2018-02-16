const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const MessageType = require('../messages/type');
    const TopicType = require('../topics/type');
    return {
      id: { type: GraphQLID },
      login: { type: GraphQLString },
      email: { type: GraphQLString },
      role: { type: GraphQLString },
      creationTime: {
        type: GraphQLString
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
        resolve: resolvers.getMessages
      },

      topics: {
        type: new GraphQLList(TopicType),
        args: {
          first: {
            type: GraphQLInt
          },
          offset: {
            type: GraphQLInt
          }
        },
        resolve: resolvers.getTopics
      }
    };
  }
});
