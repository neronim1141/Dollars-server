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
  name: 'Topic',
  fields: () => {
    const MessageType = require('../messages/type');
    const UserType = require('../users/type');
    return {
      id: { type: GraphQLID },
      author: {
        type: UserType,
        resolve: resolvers.getAuthor
      },
      creationTime: {
        type: GraphQLString
      },
      title: { type: GraphQLString },
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
      }
    };
  }
});
