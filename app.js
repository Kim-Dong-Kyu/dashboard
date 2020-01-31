var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var path = require('path');
var router = express.Router();
var mysql = require('mariadb');
var login_ok = require('./router/login_ok.js');
var RealTime_data = require('./data_api/RealTime_data.js')
var register_ok = require('./router/register_ok.js');
var Data_search = require('./data_api/Data_search.js');
var express = require('express');
var session = require('express-session');
var alarm = require('./data_api/RealTime_alarm.js')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

app.use(bodyParser.urlencoded({extended: false})) //bodyparser를 등록해줘야 post 방식에서 데이터를 읽을 수 있음.
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);


app.get('/',function(req,res){
    res.render('login.html');
});

app.post('/login_ok',login_ok);
// app.post('/login_ok',Data_search);
app.post('/RealTime_alarm',alarm);
app.post('/RealTime_data',RealTime_data);
app.post('/register_ok',register_ok);
app.post('/Data_search',Data_search);
app.get('/register.ejs',function(req,res){
    res.render('register.ejs');
})
app.get('/table_day',function(req,res){
    res.render('table_day.ejs');
})

app.get('/table_month', function(req, res){
    res.render ('table_month.ejs')
});
app.get('/table_time', function(req, res){
    res.render ('table_time.ejs')
});
app.get('/table_year', function(req, res){
    res.render ('table_year.ejs')
});

app.get('/table_index', function(req, res){

   res.render("table_index.html")
});
app.get('/main', function (req, res) {
  res.render('main.ejs');
});

app.listen(3001, function () {
    console.log("client accept port 3001")
});
