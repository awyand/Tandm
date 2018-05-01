const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const User = require('mongoose').model('User');

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    // user values passed through from auth middleware
    user: req.user
  });
});

// Handle get request to api/:id
router.get('/:id', (req, res) => {
  // Find user by ID
  User.findOne( {_id: req.params.id}, (err, user) => {
    // Error handling
    if (err) {
      return res.status(500).end();
    }

    // Send match
    res.send({missions: user.missions});
  });
});

// handle posts to api/:id
router.post('/:id', (req, res) => {
  // Find user by ID and push new mission data to user's mission array
  // Pass new: true option so that Mongoose response includes new mission
  User.findOneAndUpdate({_id: req.params.id}, {$push: {missions: req.body.missionData}}, {new: true}, function(err, user) {
    // error handling
    if (err) {
      return res.status(500).end();
    }

    // send updated array of missions
    res.send({missions: user.missions});
  });


});


module.exports = router;
