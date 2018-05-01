// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');

// Set up Express Router
const router = new express.Router();

// Connect to the database and load models
const dbUri = process.env.MONGODB_URI || config.dbUri;
require('./server/models').connect(dbUri);

// Set up Express App
const app = express();

// Set up static routes
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// Set up Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Passport
app.use(passport.initialize());

// Load Passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Set up authentication middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Set up authentication and API routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Redirect anything not defined in above routes to homepage
app.use((req,res) => {
  res.redirect('/');
})

// Set port
app.set('port', (process.env.PORT || 3000));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Tandm running on port ${app.get('port')}`);
});
