/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var router = express.Router();
router.route('/pong')
    .get(function(req,res){
        var response = {
            'request_method': "GET",
            'response_code' : 200,
            'response_data' : "ping"
        };
        res.json(response);
    })
    .post(function(req,res){
        var response = {
            'request_method': "POST",
            'response_code' : 200,
            'response_data' : "ping"
        };
        res.json(response);
    })
    .put(function(req,res){
        var response = {
            'request_method': "PUT",
            'response_code' : 200,
            'response_data' : "ping"
        };
        res.json(response);
    })
    .delete(function(req,res){
        var response = {
            'request_method': "DELETE",
            'response_code' : 200,
            'response_data' : "ping"
        };
        res.json(response);
    })
module.exports = router;
