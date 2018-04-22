const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQlDate
} = require('graphql');
const resolvers = require('./resolvers');
module.exports = new GraphQLObjectType({
  name: 'Message',
  fields: () => {
    const UserType = require('../users/type');

    return {
      id: { type: GraphQLID },
      author: {
        type: UserType,
        resolve: resolvers.getAuthor
      },
      message: { type: GraphQLString },
      creationTime: {
        type: GraphQLString
      }
    };
  }
});
