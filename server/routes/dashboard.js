const express = require('express');
const dashboardRouter = new express.Router();

dashboardRouter.post('/new', (req, res) => {
  console.log(req);

  res.send('received');
});

module.exports = dashboardRouter;
