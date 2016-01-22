var express = require('express');
var firebase = require('../firebase');
var router = express.Router();
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/teams/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
	res.render('register', {title: 'AppDirect | Register'});
});

router.post('/register', function(req, res) {
  var secretKey = uuid.v4();

  var team = {
    url: req.body.url,
    projectName: req.body.projectName,
    active: false,
    successCount: 0,
    secretKey: secretKey
  };

  firebase.createTeam(team).then(function() {
    res.render('success', {
      title: 'Yay!',
      message: 'Your team should show up on the listing page shortly!',
      secretKey: secretKey
    });
  }, function() {
    res.render('error', {title: 'Something broke', message: 'Oh no :('});
  });
});

router.get('/check', function(req, res) {
  res.status(200).end();
});

module.exports = router;
