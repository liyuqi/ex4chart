//mongodbDemo
// var mongodb = require('../models/db.js');

var util = require('util');
exports.nw01 = function(nwdb){
    return function(req, res) {
        //1. Order Subtotals  訂單小計
        // Create a collection
        var collection = nwdb.get('order_details');
        //var collection = nwdb.get('order_details');
        // Execute aggregate, notice the pipeline is expressed as an Array
        console.log("訂單小計 : ");
        collection.col.aggregate([
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
        ], function(err, result) {
            if(err){
                console.log("err : "+err.message);
            }
            console.log("result : "+util.inspect(result));
            res.render('nw01', {title: '訂單小計', result: result });
        });
    };
};

//    return function(req, res) {
//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//
//
//var orderSubtotalsSchema = new Schema({
//    Subtotal:  Number,
//    OrderID: String
//});
//var orderSubtotal=mongoose.model("order_details", orderSubtotalsSchema,"order_details");
//var db = mongoose.createConnection( 'mongodb://localhost/Northwind' );
//db.on('error', console.error.bind(console, 'connection error: '));
//db.once('open', function () {
//
//    console.log(" connect is open !!!");
//
//
//    var query = orderSubtotal.find();
//    query.exec(function(err, accounts) {
//        if (err) {
//            console.log(err);
//        }
//
//        console.log("query : "+util.inspect(accounts));
//    });
//
//});
//exports.nw01 = function(){
//    return function(req, res) {
//        orderSubtotal.aggregate([
//                {$project:{
//                    _id:0,
//                    OrderID:"$OrderID",
//                    Subtotal:{$multiply : ["$UnitPrice", "$Quantity"]}
//                }}
//                ,{$group:{
//                    _id:"$OrderID",
//                    Subtotal:{$sum:"$Subtotal"}
//                }}
//                ,{$project:{
//                    _id:0,
//                    OrderID:"$_id",
//                    Subtotal:"$Subtotal"
//                }}
//                ,{$sort:{OrderID:1}}
//        ], function (err, result) {
//            if (err) {
//                console.log(err);
//                return;
//            }
//            console.log("result : "+util.inspect(result));
//            res.render( 'nw01', {
//                title : '訂單小計',
//                result : result
//            });
//        });
//
//    };
//
//};