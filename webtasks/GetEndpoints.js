var Firebase = require("firebase")
var request = require('request')

// https://webtask.io/docs/model
module.exports = function (context, req, res) {
  runJob(context, req, res)
}

function runJob(context, req, res) {
  try {
    var rootRef = initializeFirebase(context)
    console.log('reading team urls ...')
    rootRef.child('teamUrls').once('value', function(teams) {
        teams.forEach(function(team) {
          updateTeamStatus(team.key(), team.val().url)
        })
    });
    if (res) res.status(200).send(teamUrls.toString())
  } catch(err) {
    console.log(err)
    if (res) res.status(500).send('exception occurred during script execution')
  }
}

function updateTeamStatus(teamKey, teamEndpoint) {
  console.log("Updating info for " + teamKey + " from endpoint " + teamEndpoint)
  request(teamEndpoint, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      console.log(data)
      //TODO call update DB method with the data returned from the endpoint
    }
  })
}

function initializeFirebase(context) {
  var url = context.data.firebase_url||process.env.FIREBASE_URL
  var secret = context.data.firebase_secret||process.env.FIREBASE_SECRET
  console.log('connecting to firebase url ' + url)
  var ref = new Firebase(url)
  ref.authWithCustomToken(secret, function(err, data){
    if(err) throw "authentication error!"
  });
  return ref;
}

runJob({data:{}}, null, null)
