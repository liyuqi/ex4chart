var express = require('express');
var router = express.Router();
var util = require('util');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express4 + C3.js Demo' });
});

router.barChart = function(req, res){
  res.render('barChart', {  title: 'barChart'});

};

router.pieChart = function(req, res){
  res.render('pieChart', {  title: 'pieChart'});

};

router.donutChart = function(req, res){
  res.render('donutChart', {  title: 'donutChart'});

};

module.exports = router;

