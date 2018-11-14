// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  env: 'development',
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: 'movie-secret'
  },

  mongo: {
    uri: "mongodb://admin:helloThere@devcluster-shard-00-00-isjwh.mongodb.net:27017,devcluster-shard-00-01-isjwh.mongodb.net:27017,devcluster-shard-00-02-isjwh.mongodb.net:27017/test?ssl=true&replicaSet=DevCluster-shard-0&authSource=admin&retryWrites=true" || 'mongodb://localhost:27017/chatapp',
    options: {
      useMongoClient: true
    },
    populate: false,
    debug: {
      fields: true,
      errors: true
    }
  },
  seedDB: process.env.PUPULATE_DB || 'true'
};
