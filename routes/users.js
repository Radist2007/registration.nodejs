
var express = require('express');

var router = express.Router();

//Get Users
router.post('/login', function(req, res){
	var name = req.body.name;
	var pass = req.body.password;
	console.log('/login submit');
	console.log(name + pass);
	res.render('user');
});

module.exports = router;
