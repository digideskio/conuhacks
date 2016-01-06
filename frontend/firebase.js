var Firebase = require('firebase');
var FirebaseTokenGenerator = require('firebase-token-generator');
var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
var token = tokenGenerator.createToken({}, {admin: true});
var ref = new Firebase('https://boiling-fire-9252.firebaseio.com');
var Promise = require('es6-promise').Promise;

var authPromise = new Promise(function(resolve, reject) {
  ref.authWithCustomToken(token, function(error, authData) {
    if (error) {
      reject(error);
      return;
    }

    resolve();
  });
});

module.exports = {
  authenticate: function(cb) {
    return authPromise;
  },

  createTeam: function(team) {
    return this.authenticate().then(function() {
      ref.child('teams').push(team);
    });
  }
}
