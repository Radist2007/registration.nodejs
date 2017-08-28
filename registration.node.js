
//--------------------------------------------------------------------------------Подключаем зависимосте
var express = require('express');//Подключаем експрес

// var routes = require('./routes/index');
var users = require('./routes/users');

//Init App
var app = express();//


//--------------------------------------------------------------------------------MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mysql',
	database: 'node'
});

connection.connect(function(error) {
	if(!!error) {
		console.log('Error');
	} else {
		console.log('Connected');
	}
});

//--------------------------------------------------------------------------------Подключаем ХЕНДЛБАР
//handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);//
app.set('view engine', 'handlebars');//

//--------------------------------------------------------------------------------Настраиваем порт
//Set Port
app.set('port', process.env.PORT || 3000);//Устанавливаем порт

//--------------------------------------------------------------------------------????????????
//Set Static Folder
app.use(express.static(__dirname + '/public'));


app.use(require('body-parser')());

//--------------------------------------------------------------------------------Подключаем страницы
app.get('/', function(req, res){
	res.render('home');
	console.log('/ -->/home'); 
	connection.query("SELECT * FROM users", function(error, rows, fields) {
		if(!!error) {
			console.log('Error in the query');
		} else {
			console.log('Successful query');
			console.log(rows);
		}
	});
});

app.get('/home', function(req, res){
	res.render('home');
	console.log('/home');
});

app.get('/login', function(req, res){
	res.render('login');
	console.log('/login');
});

// app.use('/', routes);
app.use('/users', users);

// app.get('/admin', function(req, res){
// 	res.render('admin');
// 	console.log('/admin');
// });

app.get('/registration', function(req, res){
	res.render('registration');
	console.log('/registration');
});

app.get('/sendMail', function(req, res){
	res.render('sendMail');
	console.log('/sendMail');
});

app.get('/about', function(req, res){
	res.render('about');
	console.log('/about');
});

//--------------------------------------------------------------------------------Обработка ошибок
// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//--------------------------------------------------------------------------------Подключаем порт сервера
//Set Port
app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
      app.get('port') + '; press Ctrl-C to terminate.' );
});
