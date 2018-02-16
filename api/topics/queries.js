const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const TopicType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  topic: {
    type: TopicType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
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
    resolve: resolvers.getList
  }
};
module.exports = queries;
