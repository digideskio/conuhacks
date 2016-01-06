var Firebase = require("firebase")
var request = require('request')
var rootRef

// https://webtask.io/docs/model
module.exports = function (context, req, res) {
  runJob(context, req, res)
}

function runJob(context, req, res) {
  rootRef = initializeFirebase(context).child('teams')
  try {
    console.log('reading team urls ...')
    rootRef.once('value', function(teams) {
        teams.forEach(updateTeamStatus)
    })
    if (res) res.status(200).send(teamUrls.toString())
  } catch(err) {
    console.log(err)
    if (res) res.status(500).send('exception occurred during script execution')
  }
}

function updateTeamStatus(teamObj) {
  var team = teamObj.val()
  console.log("Updating info for " + teamObj.key() + " from endpoint " + team.url)
  request(team.url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      console.log("succesfully read data from endpoint :" + data)
      team.data = parseJSON(data)
    } else {
      console.log("got an error when calling endpoint from " + teamObj.key() + "with response code " + response.code)
      console.log(error)
      team.data = {"error": response.statusCode}
    }
    rootRef.child(teamObj.key()).update(team, function(){
      console.log("updated data for " + teamObj.key())
    })
  })
}

function parseJSON(data){
  try {
    return JSON.parse(data)
  } catch(err) {
    return {"error":"invalid json"}
  }
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
