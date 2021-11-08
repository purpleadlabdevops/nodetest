 
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");



var fs = require('fs');
var glob = require( 'glob' );
var language_dict = {};
glob.sync( './language/*.json' ).forEach( function( file ) {
  let dash = file.split("/");
  if(dash.length == 3) {
      let dot = dash[2].split(".");
    if(dot.length == 2) {
      let lang = dot[0];
      fs.readFile(file, function(err, results) {
        language_dict[lang] = JSON.parse(results.toString());
      });
    }
  }
});
  var q = path.parse(req.path, true);
  var lang = 'en';
  let dash = q.pathname.split("/");
  if(dash.length >= 2) {
    let code = dash[1];
    if(code !== '' && language_dict.hasOwnProperty(code)) {
      lang = code;
    }
  

  fs.readFile('index.ejs', function(err, results) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let results_string = results.toString()
    for (var key of Object.keys(language_dict[lang])) {
      let pattern = new RegExp("{{" + key + "}}", "g");
      results_string = results_string.replace(pattern, language_dict[lang][key]);
    }
    res.write(results_string);
    return res.end();
  });



var connection2 = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'root'
              
            });             
connection2.connect();
 
global.db2 = connection2;
 db2.query("CREATE DATABASE if not exists coderszine_demo2",
  function(err, results) {
    if(err) console.log(err);
    else console.log("The database is created");
});
 db2.end();
 var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              database: "coderszine_demo2"
            });
 connection.connect();
 
global.db = connection;
var sql = `create table if not exists users(
  id int primary key auto_increment,
  password varchar(255) not null,
  name varchar(255) not null,
  email varchar(100) not null,
  phone varchar(20) not null,
  country varchar(255) not null,
  city varchar(255) not null,
  address varchar(255) not null,
  registered DATETIME DEFAULT NOW(),
  UNIQUE KEY unique_email (email)
)`;
 db.query(sql,
  function(err, results) {
    if(err) console.log(err);
    else console.log("The table users is created");
});
 var sql2 = `create table if not exists deals(
  id int primary key auto_increment,
  deal_title  varchar(255) not null,
  company_name varchar(255) not null,
  client_name varchar(255) not null,
  client_email  varchar(100) not null,
  client_phone  varchar(255) not null,
  offer_cost varchar(20) not null
)`;
 db.query(sql2,
  function(err, results) {
    if(err) console.log(err);
    else console.log("The table deals is created");
});

app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }));
 
app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/home/signupdeal', user.signupdeal);
app.post('/home/signupdeal', user.signupdeal);

app.get('/home/logout', user.logout);

app.listen(9000)
