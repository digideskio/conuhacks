var request = require('superagent');
var Promise = require('es6-promise').Promise;

module.exports = function(recaptcha) {
	return new Promise(function(resolve, reject) {
		var data = {
			secret: process.env.RECAPTCHA_SECRET,
			response: recaptcha
		};

		request.get('https://www.google.com/recaptcha/api/siteverify')
			.query(data)
			.end(function(err, res) {
				if (err || !res.body.success) {
					reject(err);
				}

				resolve();
			});
	});
};
