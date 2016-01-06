# ConUHacks Marketplace

AppDirect's API challenge may be a little different than what you are accustomed to. Rather than providing you with an API endpoint, we will ask your team for an endpoint for us to contact you!

This pattern is sometimes called a [webhook](https://en.wikipedia.org/wiki/Webhook). It is particularly useful for real-time integration scenarios between systems. Much of AppDirect's billing and event functionality works that way. Rather than having a client poll for events happening in a third party system, you reverse the roles: don't call us, we'll call you.

For ConUHacks, we have created a system that enables participants to register their team members & hackathon projects into a demonstration marketplace. It is in a sense a miniature version of how AppDirect works.

When you implement the endpoint correctly, your application & team will show up on the marketplace with the information you have provided to us. The more information you provide, the better your profile on the marketplace will look.

The marketplace is visible to everyone at https://conuhacks.appdirectondemand.com. Other teams and event attendees will be able to see your project and team profile and it will be displayed on a big screen tv.

## Register your endpoint

Visit https://conuhacks.appdirectondemand.com/register and follow the instructions. You will be asked to enter a valid URI. Our server will periodically make requests to all registered endpoints.

**You will receive a secret key. Don't lose it and keep it to yourself!**

## Response

The server will make a `GET` request to your URI and expect a response with a status code of `200 OK`, and a content type of `application/json`.

Additionally, the response you return should have a header called `X-AppDirect-Key` with a value set to your secret key.

The response you return should be in the following format:

```javascript
{
	// These two fields are mandatory. The rest is optional!
	teamName: "Your team name",

	// Cheese!
	teamPicture: "http://imgur.com/yourteam.jpg",

	projectName: "Your project name",     //

	// Make it square ideally
	projectPicture: "http://imgur.com/yourproject.jpg",

	projectDescription: "Lorem ipsum dolor sit amet, te delectus pertinax referrentur qui. Utamur singulis disputando duo et, est ad debet graeco ancillae, cu appareat quaestio cum. Et eos modus primis reformidans, eum an fastidii fabellas. Euripidis vulputate te sea, ea nec vivendum postulant. Ea eam erant saperet, et veri liber populo vis. Et sonet mollis docendi duo."

	// We fully understand that this URL will be broken most of the time :)
	projectUrl: "http://yourproject.com",

	//your stack
	technology: [
		"React",
		"Node.js",
		"MongoDB"
	]

	// Fill this array up as needed
	members: [{
		name: "Team member #1",

		// The email will be used to display a [GRAVATAR](https://en.gravatar.com/)
		email: "member1@team.com",

		title: "Whatever title you want :)"
	}, { ... }]
}
```

- Images may be in any web compatible format. Animated .gif anyone? :)
- Please, nothing offensive. Remember the Major League Hacking [code of conduct](http://static.mlh.io/docs/mlh-code-of-conduct.pdf

## Marketplace (Frontend)

#### Go into 

`cd frontend`

#### Install npm dependencies

`npm install`

#### Running the project

`npm start`

or with DEBUG info 

`set DEBUG=myapp:* & npm start`
