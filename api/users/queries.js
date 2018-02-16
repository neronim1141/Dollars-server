const User = require('./schema');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const UserType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  profile: {
    type: UserType,
    resolve: resolvers.getProfile
  },
  user: {
    type: UserType,

    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  users: {
    type: new GraphQLList(UserType),
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
