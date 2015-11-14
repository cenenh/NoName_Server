var jwt = require('jwt-simple');
var body = {id : '123', password : 'hihi'};
var body234 = {id : '234', password : 'hoho'};
var secret = 'remind.me';

var token = jwt.encode(body, secret);
var token234 = jwt.encode(body234, secret);
console.log(token);
console.log(token234);

var data = jwt.decode(token, secret);
var data234 = jwt.decode(token234, secret);

console.log(data);
console.log(data.id);

console.log(JSON.stringify(data));
//console.log(JSON.stringify(data).id); // undefined

console.log(data234);
