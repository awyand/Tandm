// Dependencies
const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const User = require('mongoose').model('User');

// GET /dashboard route
router.get('/dashboard', (req, res) => {
  // Respond with Status 200 and pass user from authentication middleware
  res.status(200).json({
    user: req.user
  });
});

// GET /api/:id route
router.get('/:id', (req, res) => {
  // Find user by ID in database
  User.findOne({_id: req.params.id}, (err, user) => {
    // Respond with Status 500 if an error occurs
    if (err) {
      return res.status(500).end();
    }
    // Respond with user's missions array
    res.send({missions: user.missions})
  })
})

// POST /api/:id route
router.post('/:id', (req, res) => {
  // Find user by ID and push new mission data to user's mission array
  // Pass { new: true } option so that Mongoose response includes new mission
  User.findOneAndUpdate({_id: req.params.id}, {$push: {missions: req.body.missionData}}, {new: true}, function(err, user) {
    // Respond with Status 500 if an error occurs
    if (err) {
      return res.status(500).end();
    }
    // Respond with updated version of user's missions array from database
    res.send({missions: user.missions});
  });
});

// PUT /api/:id route
router.put('/:id', (req, res) => {
  User.findOneAndUpdate({_id: req.params.id, 'missions._id': req.body.missionData._id},
  {$set: {'missions.$': req.body.missionData}}, {new: true}, function(err, user) {
    if (err) {
      return res.status(500).end();
    }
    res.send({missions: user.missions});
  });
});

// DELETE /api/:id/:missionId
router.delete('/:id/:missionId', (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$pull: {missions: {_id: req.params.missionId}}},
  {new: true}, function(err, user) {
    if (err) {
      return res.status(500).end();
    }
    res.send({missions: user.missions});
  });
});

// Export router
module.exports = router;
