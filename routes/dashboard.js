const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }

	res.render('admin/dashboard');
});

module.exports = router;