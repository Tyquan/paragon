var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const Executive = require('../models/executive');
const settings = require("../config/settings");
const Job = require('../models/job');

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
  Job.find((err, data) => {
    if (err) {
      next(err);
    } else {
      res.render('static/jobs', {
        data: data,
        title: 'Paragon Executives | Available Jobs'
      });
    }
  });
});

router.get('/contactus', function(req, res, next) {
  res.render('static/contactus', { title: 'Paragon Executives | Contact Us' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Paragon Executives | Employee Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Paragon Executives | Employee Signup' });
});

router.get('/upload', function(req, res, next) {
  res.render('static/upload', { title: 'Paragon Executives | Upload a Resume' });
});

router.post('/upload', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: settings.emailService,
    auth: {
      user: settings.emailAuth.user,
      pass: settings.emailAuth.pass
    }
  });

  var mailOptions = {
    from: settings.emailAuth.user,
    to: settings.emailReciever,
    subject: `New Paragon Executives Resume Sent from ${req.body.fullname}`,
    text: `A new resume has been sent from the Paragon Executives website.\n\n${req.body.details}\n\nParagonExecutives.com`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      next(error);
    } else {
      res.render('static/upload', {
        title: 'Paragon Executives | Upload a Resume',
        message: 'Resume successfully sent. We will call you as soon as possible'
      });
    }
  });

});

router.post('/executive', function(req, res, next) {
	let executive = new Executive(req.body);
	executive.save().then((data) => {
		res.render('static/foremployers', { title: 'Paragon Executives | For Employers', message: "Information sent successfully. We will call you" });
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;