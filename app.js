var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


var mongodb = require('./routes/mongodb');
var northwindagg = require('./routes/northwindagg');
//var monServer = require('mongodb').Server;
//var Db = require('mongodb').Db;
//var nwdb = new Db('Northwind', new monServer('localhost', 27017),{safe:false});
var monk = require('monk');
var nwdb = monk('127.0.0.1:27017/Northwind');

//add
var partials = require('express-partials');

var app = express();
//add
app.use(partials());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//move
app.use('/', routes);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { icons:true }));

app.use('/users', users);
app.use('/barChart', routes.barChart);
app.use('/pieChart', routes.pieChart);
app.use('/donutChart', routes.donutChart);
app.use('/linePlusBarChart', routes.linePlusBarChart);
app.use('/scatterBubbleChart', routes.scatterBubbleChart);
app.use('/groupStackedBarChart', routes.groupStackedBarChart);
//app.use('/mongoosePrac1', mongodb.mongoosePrac1());
app.use('/nw01', northwindagg.nw01(nwdb));
app.use('/nw01detail', northwindagg.nw01detail(nwdb));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
