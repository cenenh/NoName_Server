var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('facebook_login', { title: 'facebook-express' });
  // res.reder( jade-file-name, title )
});

module.exports = router;
