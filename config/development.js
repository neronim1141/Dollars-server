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
    uri: process.env.MONGODB_DB_URL || 'mongodb://neronim66:Himitsu1&@testcluster-shard-00-00-isjwh.mongodb.net:27017,testcluster-shard-00-01-isjwh.mongodb.net:27017,testcluster-shard-00-02-isjwh.mongodb.net:27017/test?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin',
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
