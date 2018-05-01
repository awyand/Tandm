// Dependencies
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

// Require User model
const User = require('mongoose').model('User');

// Require config file for DB URI and JWT secret
const config = require('../../config');

// Export Passport local strategy object
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  // Get user-entered data from form
  const userData = {
    username: username.trim(),
    password: password.trim()
  };

  // Find a user by username
  return User.findOne({ username: userData.username }, (err, user) => {
    // Error handling
    if (err) { return done(err); }

    // If no match is found for user, pass IncorrectCredentialsError to requesting module
    if (!user) {
      const error = new Error('Incorrect username or password');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    // Check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      // If not a match, pass IncorrectCredentialsError to requesting module
      if (!isMatch) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }

      // If no errors occured and match is found, store matched ID to payload object
      const payload = {
        sub: user._id
      };

      // Create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        username: user.username
      };

      // Return token and username to requesting module
      return done(null, token, data);
    });
  });
});
