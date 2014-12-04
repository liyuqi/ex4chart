//mongodbDemo
// var mongodb = require('../models/db.js');
var mongoose = require('mongoose');
var Schema1 = mongoose.Schema;

var util = require('util');
var orderSubtotalsSchema = new Schema1({
    Subtotal:  Number,
    OrderID: String
});
var orderSubtotal=mongoose.model('orderSubtotal', orderSubtotalsSchema);
var db = mongoose.createConnection( 'mongodb://localhost/Northwind' );
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {

    console.log(" connect is open !!!");


    var query = orderSubtotal.find();
    query.exec(function(err, accounts) {
        if (err) {
            console.log(err);
        }

        console.log("query : "+util.inspect(accounts));
    });

});
exports.nw01 = function(){
    return function(req, res) {
        orderSubtotal.aggregate([
                {$project:{
                    _id:0,
                    OrderID:"$OrderID",
                    Subtotal:{$multiply : ["$UnitPrice", "$Quantity"]}
                }}
                ,{$group:{
                    _id:"$OrderID",
                    Subtotal:{$sum:"$Subtotal"}
                }}
                ,{$project:{
                    _id:0,
                    OrderID:"$_id",
                    Subtotal:"$Subtotal"
                }}
                ,{$sort:{OrderID:1}}
        //).toArray()
        ], function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("result : "+util.inspect(result));
            res.render( 'nw01', {
                title : '訂單小計',
                result : result
            });
        });

    };
};