// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Phone schema, which is a subdocument of MissionSchema
const PhoneSchema = new mongoose.Schema({
  osVersion: String,
  name: String,
  apps: Array,
  networks: Array
});

// Mission schema, which is a subdocument of UserSchema
const MissionSchema = new mongoose.Schema({
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  name: String,
  phones: [PhoneSchema],
  active: Boolean,
  location: String
});

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  password: String,
  missions: [MissionSchema],
  dateJoined: {
    type: Date,
    default: Date.now()
  },
  inventory: {
    type: Array,
    default: [50, 50, 50, 50, 50, 50]
  }
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

// Export User model
module.exports = mongoose.model('User', UserSchema);
