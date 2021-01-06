const express = require('express');
const request = require("request");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/index', function(req,res){
    res.render('index');
});
app.get('/register', function(req,res){
    res.render('register');
});
app.get('/login', function(req,res){
    res.render('login');
});
app.get('/issue', function(req,res){
    res.render('login');
});



app.listen(3000);
