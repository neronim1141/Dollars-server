const express = require('express');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const router = express.Router();

const User = require('./users');
const Topic = require('./topics');
const Message = require('./messages');

let RootQuery = new GraphQLObjectType({
  name: 'Query', //Return this type of object
  fields: () => ({
    ...User.queries,
    ...Topic.queries,
    ...Message.queries
  })
});

let RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...User.mutations,
    ...Topic.mutations,
    ...Message.mutations
  })
});
let RootSubscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    ...Message.subscriptions
  })
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});

module.exports = schema;
