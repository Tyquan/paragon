var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const Executive = require('../models/executive');
const settings = require("../config/settings");
const Job = require('../models/job');
const Resume = require('../models/resume');

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

router.get('/careers', function(req, res, next) {
  res.render('static/careers', { title: 'Paragon Executives | Careers' });
});

router.get('/video', function(req, res, next) {
  res.render('static/video', { title: 'Paragon Executives | Introduction' });
});

router.get('/candidates', function(req, res, next) {
  res.render('static/candidates', { title: 'Paragon Executives | Candidates' });
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
  var resume = new Resume(req.body);
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
      resume.save().then((data) => {
        res.render('static/upload', {
          title: 'Paragon Executives | Upload a Resume',
          message: 'Resume successfully sent. We will call you as soon as possible'
        });
      }).catch((err) => {
        next(err);
      });
    }
  });

});

router.get("/application/:id", function(req, res, next) {
  console.log(req.params);
  Job.findById(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.render('static/application', { 
        title: 'Paragon Executives | Apply For The Job',
        data: data
      });
    }
  });
});

router.post("/application/:id", function(req, res, next) {
  console.log(req.params);
  Job.findById(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      data.applicants.push(req.body);
      data.save().then((newData) => {

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
          subject: `New Application Submitted for Job: ${newData.title}`,
          text: `A new application has arrived for the ${newData.title} position.\n\nName: ${req.body.fullname}\nEmail:${req.body.email}\nPhone Number: ${req.body.phonenumber}\n\n${req.body.details}\n\nParagonExecutives.com`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            next(error);
          } else {
            res.render(`static/application`, {
              title: 'Paragon Executives | Apply For The Job',
              data: newData,
              message: "Application Successfully Sent. We Will Call You."
            });
          }
        });
      }).catch((err) => {
        next(err);
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