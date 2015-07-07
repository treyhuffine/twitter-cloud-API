var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var data = require('../tweets.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var client = new Twitter({
  consumer_key: process.env.CK,
  consumer_secret: process.env.CS,
  access_token_key: process.env.ATK,
  access_token_secret: process.env.ATS
});


router.post('/search', function(req, res, next) {
  var words = req.body.words.split(" ");

  client.get('search/tweets', { q: words.join(" OR "), count: 100 }, function(error, tweets, response) {
    if(!error)
    res.json(data);
  });
});

module.exports = router;
