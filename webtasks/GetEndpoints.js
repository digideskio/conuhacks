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
          updateTeamStatus(team.key(), team.val().url, rootRef.child("teams"))
        })
    })
    if (res) res.status(200).send(teamUrls.toString())
  } catch(err) {
    console.log(err)
    if (res) res.status(500).send('exception occurred during script execution')
  }
}

function updateTeamStatus(teamKey, teamEndpoint, dbRef) {
  console.log("Updating info for " + teamKey + " from endpoint " + teamEndpoint)
  request(teamEndpoint, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      console.log(data)
      dbRef.child(teamKey).set(JSON.parse(data), function(){
        console.log("successfully updated data for " + teamKey)
      })
    } else {
      console.log("got an error when calling endpoint from " + teamKey + "with response code " + response.code)
      console.log(error)
      dbRef.child(teamKey).set({"error": response.statusCode})
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
  })
  return ref
}

if(process.env.CONUHACKS_LOCAL === "1"){
  console.log("running in local mode")
  runJob({data:{}}, null, null)
}
