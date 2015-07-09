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
  var words = req.body.words.toLowerCase().split(" ");

  client.get('search/tweets', { q: words.join(" OR "), count: 100 }, function(error, tweets, response){
    if (error) {
      console.error(error);
      res.status(500);
    }

    var stats = {}, oneTweetWords, lowerCaseWord, users = {};

    tweets.statuses.forEach(function(tweet) {
      oneTweetWords = tweet.text.toLowerCase().split(" ");
      oneTweetWords.forEach(function(word) {
        lowerCaseWord = word.toLowerCase();
        if (words.indexOf(lowerCaseWord) >= 0) {
          stats[word] = stats[word] || 0;
          stats[word]++;
        }
      });
    });

    res.json({ stats: stats, users: users });
  });

});

router.post('/sendtweet', function(req, res, next) {
  client.post('statuses/update', { status: req.body.tweet }, function(error, tweets, response){
    console.log(error);
    if (!error) {
      res.json(tweets);
    }
  });
});


module.exports = router;
