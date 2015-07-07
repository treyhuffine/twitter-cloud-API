var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var data = require('../tweets.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search', function(req, res, next) {
  console.log(req.body);
  res.json(data);
});

module.exports = router;
