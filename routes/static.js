var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('static/about', { title: 'Paragon Executives | About Us' });
});

router.get('/jobseekers', function(req, res, next) {
  res.render('static/jobseekers', { title: 'Paragon Executives | Job Seekers' });
});

router.get('/foremployers', function(req, res, next) {
  res.render('static/foremployers', { title: 'Paragon Executives | For Employers' });
});

router.get('/jobs', function(req, res, next) {
  res.render('static/jobs', { title: 'Paragon Executives | Jobs' });
});

router.get('/contactus', function(req, res, next) {
  res.render('static/contactus', { title: 'Paragon Executives | Contact Us' });
});

module.exports = router;