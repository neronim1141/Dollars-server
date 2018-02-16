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
    uri: process.env.MONGODB_DB_URL || 'mongodb://localhost/dollars',
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
