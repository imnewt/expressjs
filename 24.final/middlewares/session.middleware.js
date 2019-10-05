var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();

		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({
			id: sessionId
		}).write();
	}

	var session = db.get("sessions").find({ id: req.signedCookies.sessionId }).value();

	res.locals.session = session;

	next();
}