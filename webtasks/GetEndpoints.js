var Firebase = require("firebase");

// https://webtask.io/docs/model
module.exports = function (context, req, res) {
  runJob(context, req, res)
}

function runJob(context, req, res) {
  try {
    var rootRef = initializeFirebase(context)
    console.log('reading team urls ...')
    var teamUrls = rootRef.child('teamUrls').on('value', function(dataSnapshot) {
        console.log(dataSnapshot.val())
    });
    if (res) res.status(200).send(teamUrls.toString())
  } catch(err) {
    console.log(err)
    if (res) res.status(500).send('exception occurred during script execution')
  }
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
