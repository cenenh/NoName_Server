/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var async = require('async');
var router = express.Router();
var database = require('../database/db_instance');

/*
{
  'id' : string, //gseunwo@gmail.com
  'username': string, //choi eun ho
  password' : string //encrypted password
}
*/

router.post('/esignup', function(request, response){

  var new_user = {
    id : request.body.id,
    username : request.body.username,
    password : request.body.password
  };

  var db = new database();
  async.waterfall([
    function(callback){
      console.log("create database connection");
      db.connect();
      callback(null, db);
    },
    function(db, callback){
      console.log("get database connection");
      var conn = db.getConnection();
      callback(null, conn);
    },
    function(conn, callback){
      console.log("do query");
      var query = "INSERT INTO user SET ?";
      conn.query(query, new_user, function(err, rows){
        if(!err){
          callback(null, rows);
        }
        else{
          callback(JSON.parse(JSON.stringify(err)), rows);
        }
      });
    }
  ],
  function(err, result){
    var res = {};
    if(!err){
      res.code = 200;
      res.data = "OK";
      console.log(res);
      response.json(res);
    }
    else{ //if error
      // 참고 : dev.mysql.com/doc/refman/5.7/en/error-messages-server.html
      if(err.errno === 1062){
        // { code: 'ER_DUP_ENTRY', errno: 1062, sqlState: '23000', index: 0 }
        console.log("yes!")
        res.code = 400;
        res.data = "FAIL";
        res.reason = "DUPLICATE E-MAIL";
      }
      else{
        res.code = 400;
        res.data = "FAIL";
      }
      response.json(res);
    }
    db.disconnect();
  }); //async.waterfall
}); //router.post

router.get('/esignup', function(request, response){
  response.status(200).json({
    req_method: request.method,
    code : 200,
    data : "The API for e-mail-sign-up"
  });
});

router.put('/esignup', function(request, response){
  response.status(200).json({
    req_method: request.method,
    code : 200,
    data : "The API for e-mail-sign-up"
  });
});

router.delete('/esignup', function(request, response){
  response.status(200).json({
    req_method: request.method,
    code : 200,
    data : "The API for e-mail-sign-up"
  });
});

module.exports = router;
