var express = require('express');
var router = express.Router();

//Get Users
router.post('/login', function(req, res){
	var name = req.body.name;
	console.log('/login submit');
	console.log(name);
});



module.exports = router;
