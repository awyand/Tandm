const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    // user values passed through from auth middleware
    user: req.user
  });
});

router.post('/:id', (req, res) => {
  console.log(req.body);

  res.send('received');
});


module.exports = router;
