// Here's an example of an endpoint built for webtask.io
// with the full req / response handling (and secret key)
module.exports = function (ctx, req, res) {
	res.setHeader('X-AppDirect-Secret', 'ICANHAZSEKRIT');
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;

	var team = {
		teamName: 'Team AppDirect',
		teamPicture: 'http://i.giphy.com/zp0nsdaiKMP4s.gif',
		projectName: 'AppDirect ConUHacks Marketplace',
		projectPicture: 'https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg',
		projectDescription: 'The ConUHacks marketplace lets hackathon teams register their teams and projects to the AppDirect demo marketplace. All registered teams will be eligible to win a prize.',
		members: [{
			name: 'Bruno Carriere',
			title: 'JavaScript OG',
			email: 'neonskimmer@gmail.com'
		}]
	};

	res.end(JSON.stringify(team));
};