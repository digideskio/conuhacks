var express = require('express');
var firebase = require('../firebase');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
	res.render('register', {title: 'AppDirect | Register'});
});

router.post('/register', function(req, res) {
  var team = {
    url: req.body.url,
    projectName: req.body.projectName,
    active: false,
    successCount: 0
  };

  firebase.createTeam(team).then(function() {
    res.render('success', {title: 'Yay!', message: 'Your team should show up on the listing page shortly!'});
  }, function() {
    res.render('error', {title: 'Something broke', message: 'Oh no :('});
  });
});

module.exports = router;
