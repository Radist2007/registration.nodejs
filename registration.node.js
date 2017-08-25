
//--------------------------------------------------------------------------------Подключаем зависимосте
var express = require('express');//Подключаем експрес

var app = express();//

//--------------------------------------------------------------------------------Подключаем ХЕНДЛБАР
//handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);//
app.set('view engine', 'handlebars');//

//--------------------------------------------------------------------------------Настраиваем порт
app.set('port', process.env.PORT || 3000);//Устанавливаем порт

//--------------------------------------------------------------------------------????????????
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

//--------------------------------------------------------------------------------Подключаем страницы
app.get('/', function(req, res){
	res.render('home');
	console.log('/ -->/home'); 
});

app.get('/home', function(req, res){
	res.render('home');
	console.log('/home');
});

app.get('/login', function(req, res){
	res.render('login');
	console.log('/login');
});

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
app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
