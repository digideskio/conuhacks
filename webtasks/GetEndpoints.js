var Firebase = require("firebase");

var fb = new Firebase("https://boiling-fire-9252.firebaseio.com");

fb.authWithCustomToken(process.env.FIREBASE_SECRET, function(err, data){
  if(err){
    console.log("auth error!")
  }else{
    console.log("logged into firebase")
  }
});
