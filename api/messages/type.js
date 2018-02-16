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

module.exports = new GraphQLObjectType({
  name: 'Message',
  fields: () => {
    const UserType = require('../users/type');

    return {
      id: { type: GraphQLID },
      author: { type: UserType },
      message: { type: GraphQLString },
      creationTime: {
        type: GraphQLString
      }
    };
  }
});
