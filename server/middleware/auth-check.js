// Dependencies
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // If authorization object doesn't exist in header
  if (!req.headers.authorization) {
    // Return Status 401
    return res.status(401).end();
  }

  // Get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // Decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // If an error occurs, return Status 401
    if (err) { return res.status(401).end(); }

    // Otherwise, save decoded token to a variable
    const userId = decoded.sub;

    // Check if a user exists
    return User.findById(userId, (userErr, user) => {
      // If an error occurs or no match is found
      if (userErr || !user) {
        // Respond with Status 401
        return res.status(401).end();
      }
      // Otherwise, a match was found and no error occured
      // Pass user details onto next route
      req.user = user;
      return next();
    });
  });
};
