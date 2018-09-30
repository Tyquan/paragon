const express = require('express');
const router = express.Router();
const Executive = require('../models/executive');
const Job = require('../models/job');
const Resume = require("../models/resume");

router.get("/dashboard", function(req, res) {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }

	res.render('admin/dashboard');
});

router.get("/jobs", function(req, res) {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }

	Job.find((err, data) => {
		if (err) {
			res.render('admin/executives');
		} else {
			res.render('admin/jobs', {
				data: data,
				title: 'Paragon Executives | Jobs'
			});
		}
	});
});

router.get('/resumes', function(req, res, next) {
	Resume.find((err, data) => {
		if (err) {
			res.render("/admin/jobs", {
				message: "Unable To Retreive Resumes"
			});
		} else {
			res.render("admin/resumes", {
				data: data
			});
		}
	});
  res.render('admin/resumes', { title: 'Paragon Executives | Sent Resumes' });
});

router.post("/jobs", function(req, res) {
	var job = new Job(req.body);
	job.save().then((data) => {
		res.render("admin/jobs", {
			data: data,
			message: "Job Successfully Saved!"
		});
	}).catch((err) => {
		res.render("admin/jobs", {
			message: "Unable to save this job"
		});
	});
});

router.get("/executives", function(req, res) {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }
	Executive.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.render('admin/executives', {
				data: data
			});
		}
	});
});

module.exports = router;