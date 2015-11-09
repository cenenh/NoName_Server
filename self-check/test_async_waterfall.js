var async = require('async');

async.waterfall([
  function(callback){
    console.log('1th');
    callback(null, '하나', '둘');
  },
  function(arg1, arg2, callback){
    // arg1는 '하나'고, arg2는 '둘'이다.
    console.log('2th');
    console.log(arg1 + arg2);
    callback(null, '셋');
  },
  function(arg1, callback){
    // arg1은 '셋'이다.
    console.log('3th');
    console.log(arg1);
    callback(null, '끝');
  }
], function (err, result) {
   // result에는 '끝'이 담겨 온다.
   console.log('last');
   console.log(result);
});
