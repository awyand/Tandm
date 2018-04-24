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

router.post('/:id', (req, res) => {
  // console.log(JSON.stringify(req.body.missionData, null, 2));
  // console.log(req.params.id);
  // console.log(req.body.missionData);
  console.log(`Updating User ID: ${req.params.id}`);
  console.log(`Updating with following Mission Data:`);
  console.log(req.body.missionData);

  User.findOneAndUpdate({_id: req.params.id}, {$push: {missions: req.body.missionData}}, function(err, mission) {
    console.log(mission);
  });


  // User.findOneAndUpdate(
  //   { id: req.params.id },
  //   { $push: { 'missions': req.body.missionData } }
  // ), function(error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(success);
  //   }
  // }

  res.send('received');
});


module.exports = router;
