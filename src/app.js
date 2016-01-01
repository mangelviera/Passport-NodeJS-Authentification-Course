var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var authRoute = require('./authroute');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.set('views', 'views');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use(cookieParser());
app.use(session({secret : 'library'}));
require('./config/passport')(app);

app.engine('.hbs', handlebars({extname : 'hbs'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index', {});
});

app.use('/auth', authRoute());

app.listen(3000, function () {
    console.log('Running application');
});
