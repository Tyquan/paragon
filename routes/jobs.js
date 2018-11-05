var express = require('express');
var router = express.Router();
const Job = require('../models/job');

router.get("/:id", function(req, res, next) {
  console.log(req.params);
  Job.findById(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = router;