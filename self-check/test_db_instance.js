var database = require('../database/db_instance');
var db = new database();
var query = "select * from json_test";

db.connect();
var conn = db.getConnection();
conn.query(query, function(error,data){
  if(!error){
    console.log(data);
  }
});
db.disconnect();
