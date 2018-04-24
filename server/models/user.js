const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const ContainerSchema = new mongoose.Schema({
//   name: String,
//   networks: Array,
//   apps: Array
// });
//
// const PhoneSchema = new mongoose.Schema({
//   osVersion: String,
//   containers: [ContainerSchema],
//   name: {
//     type: String,
//     index: { unique: true }
//   }
// });
//
// const MissionSchema = new mongoose.Schema({
//   dateAdded: {
//     type: Date,
//     default: Date.now()
//   },
//   name: {
//     type: String,
//     index: { unique: true }
//   },
//   phones: [PhoneSchema]
// });

// define the User model schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  password: String,
  // missions: [MissionSchema]
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


module.exports = mongoose.model('User', UserSchema);
