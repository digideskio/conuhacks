var Firebase = require("firebase")
var request = require('request')
var rootRef

// https://webtask.io/docs/model
module.exports = function (context, cb) {
  runJob(context, cb)
}

function runJob(context, cb) {
  rootRef = initializeFirebase(context).child('teams')
  console.log('reading team urls ...')
  rootRef.once('value', function(teams) {
      teams.forEach(updateTeamStatus)
  })
  cb(null, {success:true})
}

function updateTeamStatus(teamObj) {
  var teamId = teamObj.key()
  var team = teamObj.val()

  console.log("reading data for team id '" + teamId + "' from endpoint " + team.url)

  request(team.url, function (error, response, data) {
    var statusCode = response ? response.statusCode : null
    if (!error && statusCode == 200) {
      console.log(teamObj.val()['secretKey'])
      console.log('header='+JSON.stringify(response.headers))
      var parsedData = parseJSON(data)
      if(parsedData.error){
        console.log(teamId + ' is NOT active')
        team.active = false
        team.lastError = parsedData.error
      } else if (response.headers['x-appdirect-secret'] !== team.secretKey &&
                 response.headers['X-AppDirect-Secret'] !== team.secretKey &&
                 response.headers['X-APPDIRECT-SECRET'] !== team.secretKey &&
                 response.headers['x-appdirect-key'] !== team.secretKey &&
                 response.headers['X-AppDirect-Key'] !== team.secretKey &&
                 response.headers['X-APPDIRECT-KEY'] !== team.secretKey) {
        console.log(teamId + ' is NOT active')
        team.active = false
        team.lastError = {"error": "invalid secret key", "timestamp": new Date()}
      } else {
        console.log(teamId + ' is active')
        team.active = true
        team.data = parsedData
        team.lastSuccessfulUpdate = new Date()
        team.successCount = team.successCount + 1
      }
    } else {
      team.active = false
      team.lastError = {"error": statusCode, "timestamp": new Date()}
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
    return {"error":"invalid json", "timestamp": new Date()}
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
  runJob({data:{}}, function(){})
}
