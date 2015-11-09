var fs = require('fs');
var async = require('async');
var data = "hi!";

//implement functions
var file_read_call_back = function(err, data){
  if(err){
    console.log(err); //print error if error
  }
  console.log(data); //after readFile(), print contents of file.
}

fs.readFile('./self-check/f1.txt','utf-8',file_read_call_back);

console.log(data); //hi!가 먼저 출력됩니다. readFile이 끝나지 않아서 먼저 실행됨!
