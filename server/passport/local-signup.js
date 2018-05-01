// Dependencies
const PassportLocalStrategy = require('passport-local').Strategy;

// Require User model
const User = require('mongoose').model('User');

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

  // Create new User object
  const newUser = new User(userData);
  // Save to database
  newUser.save((err) => {
    if (err) { return done(err); }
    return done(null);
  });
});
