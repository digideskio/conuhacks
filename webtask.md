# Webtask.io

[Webtask.io](https://webtask.io) lets you run code with an HTTP call with no provisioning, no deployment and no headaches.

Setting up a webhook endpoint with webtask.io is so easy, it's practically cheating (_not actually cheating_).

You can follow the detailed instructions on the website, or this 30s walkthrough.

1. Install the webtask client:

```bash
npm install wt-cli -g
```

2. Create a webtask JavaScript file.

Here's the simplest thing that'll work:

```javascript
module.exports = function(cb) {
	cb(null, {
		teamName: 'Awesome Team'
	});
};
```

3. "Deploy" the webtask.

```bash
wt create example.js

# This will return a URL that looks like
# https://webtask.it.auth0.com/api/run/wt-2323423452343-0/example?webtask_no_cache=1
```

4. You are done.
