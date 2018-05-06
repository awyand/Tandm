// Dependencies
const express = require('express');
const validator = require('validator');
const passport = require('passport');

// Set up Express Router
const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide a valid username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

// Validate the log in form
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

// Handle POST request to /signup
router.post('/signup', (req, res, next) => {
  // Store information from validateSignupForm method to a variable
  const validationResult = validateSignupForm(req.body);
  // If validate was not successful, respond with Status 400 and pass information
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  // Authenticate sign up in database
  return passport.authenticate('local-signup', (err) => {
    // Error handling
    if (err) {
      // If Mongo responds with duplicate error code
      if (err.name === 'MongoError' && err.code === 11000) {
        // Respond with Status 409 and pass information
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            username: 'This username is already taken.'
          }
        });
      }

      // If any other error occurs, respond with Status 400 and pass information
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    // If no error occured, respond with Status 200 and pass success information
    return res.status(200).json({
      success: true,
      message: 'Sign up successful! Please log in to get started.'
    });
  })(req, res, next);
});

// Handle POST to /login
router.post('/login', (req, res, next) => {
  // Store information from validateLoginForm method to a variable
  const validationResult = validateLoginForm(req.body);
  // If validate was not successful, respond with Status 400 and pass information
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  // Authenticate login in database
  return passport.authenticate('local-login', (err, token, userData) => {
    // Error handling
    if (err) {
      // If Passport responds with IncorrectCredentialsError
      if (err.name === 'IncorrectCredentialsError') {
        // Respond with Status 400 and pass information
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      // If any other error occurs, respond with Status 400 and pass information
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    // If no error occured, respond with Status 200
    // Pass token and matched user data
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

// Export router
module.exports = router;
