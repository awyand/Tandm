// Dependencies
const mongoose = require('mongoose');

// Export database connect method object
// Accepts database URI
module.exports.connect = (uri) => {
  // Connect to database via Mongoose
  mongoose.connect(uri, {
    useMongoClient: true
  });
  // Plug in the Promise library
  mongoose.Promise = global.Promise;

  // If connection method returns an error
  mongoose.connection.on('error', (err) => {
    // Log error and exit
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // Load User model
  require('./user');
};
