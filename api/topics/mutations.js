const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const TopicType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  createTopic: {
    type: TopicType,
    args: {
      author: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createTopic
  },
  removeTopic: {
    type: TopicType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteTopic
  },
  updateTopic: {
    type: TopicType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: { type: GraphQLString }
    },
    resolve: resolvers.updateTopic
  }
};

module.exports = mutations;
