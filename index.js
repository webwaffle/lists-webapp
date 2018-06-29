var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fs = require('fs');
var moment = require('moment');
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});

var app = express();
app.use(express.static(__dirname + '/static'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var options = {
    secret: 'yee',
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true
    },
    name: 'my.connect.sid'
}
app.use(session(options));

app.set('port', process.env.PORT || 3000);



app.get('/home', function(req, res) {
    res.render('home/home', {
        user: {
            name: req.session.username,
            id: req.session.userid
        }/*,
        lists: lists*/
    });
});

app.post('/create-list-process', function(req, res) {
    if(req.body.name != "") {
        var homec = require('./controllers/home-controller');
        homec.create_list(req.session.userid, req.session.username, req.body.name);
        res.redirect(303, '/home');
    } else {
        res.redirect(303, '/home');
    }
});
app.post('/join-list-process', function(req, res) {
    if(req.body.id) {
        var idint = parseInt(req.body.id, 10);
        var homec = require('./controllers/home-controller');
        console.log(homec.join_list(idint, req.session.userid, req.session.username));
    }
    res.redirect(303, '/home');
});

app.get('/', function(req, res) {
    res.render('login/form');
});
app.post('/login-process', function(req, res) {
    if(req.body.username && req.body.password) {
        var userc = require('./controllers/login-controller');
        if(userc.auth_login(req.body.username, req.body.password)[0] == 0) {
            req.session.username = req.body.username;
            req.session.userid = userc.auth_login(req.body.username, req.body.password)[1];
            res.redirect(303, '/home');
        } else {
            res.render('login/wrong-pass', {user: req.body.username, pass: req.body.password});
        }
    }
});
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie(options.name);
        }
    });
    res.render('login/logout');
});

app.get('/user-create', function(req, res) {
    res.render('login/create');
});
app.post('/user-create-process', function(req, res) {
    if(req.body.username && req.body.password) {
        var userc = require('./controllers/login-controller');
        userc.create_user(req.body.username, req.body.password, moment().format("MM-DD-YYYY h:mm:ss a"));
        res.send('lol');
    }
});

app.use(function (req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send('error 404, lol dis no exist');
});

app.listen(app.get('port'), function () {
    console.log("Started");
});
