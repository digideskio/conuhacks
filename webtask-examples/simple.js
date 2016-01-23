// Here's an example of an endpoint built for webtask.io

module.exports = function (ctx, cb) {

	console.log('salut!');

	return cb(null, {
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
	});


};
