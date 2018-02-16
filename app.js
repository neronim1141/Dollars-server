const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const config = require('./config');

//#region database:Mongo
const mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', function(err) {
  console.error(
    'MongoDB connection to <' + config.mongo.uri + '> failed: ' + err
  );
  process.exit(-1);
});
//#endregion

var app = express();
app.use(logger('dev'));
//#region view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//#endregion

//#region Authenticate
const passport = require('passport');
const jwt = require('express-jwt');
app.use(passport.initialize());
require('./auth/passport').setup(config);

app.use(
  jwt({
    secret: config.secrets.session,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  })
);
//#endregion

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
const cors = require('cors');
app.use(cors());

//#region parsers
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//#endregion
app.use(express.static(path.join(__dirname, 'public')));

//#region Graphql
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const schema = require('./api');

app.use(
  '/api',
  bodyParser.json(),
  graphqlExpress({
    schema: schema
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    schema: schema,
    endpointURL: '/api',
    graphiql: true,
    subscriptionsEndpoint: `ws://localhost:${config.port}/subscriptions`
  })
);
// app.use(
//   '',
//   expressGraphQL({
//     schema: schema,
//     graphiql: true,
//     subscriptionsEndpoint: `ws://localhost:${config.port}/subscriptions`,
//     formatError(err) {
//       if (true) {
//         //debugmode
//         return {
//           message: err.message,
//           code: err.originalError && err.originalError.code,
//           locations: err.locations,
//           path: err.path
//         };
//       } else {
//         return {
//           message: err.message,
//           code: err.originalError && err.originalError.code // <--
//           //   locations: err.locations,
//           //   path: err.path
//         };
//       }
//     }
//   })
// );
//#endregion

if (config.mongo.populate) {
  const populate = require('./populate');
}
//#region catch Error
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//#endregion

module.exports = app;
