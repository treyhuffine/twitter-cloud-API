var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var data = require('../tweets.json');
console.log(data);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.json(data);
});

module.exports = router;
