const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const UserType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  //#region part of crud
  createUser: {
    type: UserType,
    args: {
      login: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createUser
  },
  removeUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteUser
  },
  updateUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      login: { type: GraphQLString },
      email: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateUser
  },
  //#endregion
  //#region Auth
  login: {
    type: new GraphQLObjectType({
      name: 'loginMutation',
      fields: {
        user: { type: UserType },
        token: { type: GraphQLString }
      }
    }),

    args: {
      login: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.login
  }
};

module.exports = mutations;
