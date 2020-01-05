var express = require('express');
var app = express();
var DBLogic = require('./controller/DBLogic.js');
var body_parser = require('body-parser');
var session = require('express-session');
var json = require('./error.json');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/uploads'));
app.use(session({
    key: 'user_id',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5000000, secure: false }
}));
app.use((req, res, next) => {
    if (req.session.cookie && !req.session.user)
        res.clearCookie('user_id');
    next();
});
app.get('/', (req, res) => {
    return res.render('pages/index.ejs');
});
app.post('/login_user', (req, res) => {
    DBLogic.loginUser(req.body.name, req.body.pass).then((promiseResult) => {
        if (promiseResult) {
            req.session.user = {};
            req.session.user.name = req.body.name;
            console.log("The value of name is", req.session.user.name)
            DBLogic.getPath(req.session.user.name).then(pm => {
                if (pm) {
                    console.log("The promise result is", pm);
                    console.log("Hi there,this is the pm.image_hash", pm[0]["image_hash"]);
                    req.session.user.path = pm[0]["image_hash"];
                    console.log("The session path is", req.session.user.path);
                    req.session.sessionFlash = {
                        type: 'failed',
                        messgae: '1'
                    }
                    req.flash('message', req.session.user.name);
                    console.log("The session object is", req.session.user);
                    return res.redirect('/selectGame');
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }).catch(e => {
        console.log("The error is", e);
    });
})
app.post('/register_user', upload.single('pic'), (req, res) => {
    console.log("here ub");
    console.log("From multer", req.file);
    //  console.log("From fileupload",req.files.pic);
    DBLogic.registerUser(req.body.username, req.body.email, req.body.pass, req.file).then((promiseResult) => {
        if (promiseResult) {
            console.log("Registered");
            return res.render('pages/index.ejs', { msg: "User registered" });
        }
    }).catch(e => {
        return res.render('pages/index.ejs', { msg: e });
    });
});


app.get('/logout', (req, res) => {
    if (req.session.user && req.session.cookie) {
        res.clearCookie('user_id');
        req.session.destroy();
        return res.redirect('/');
    }
    else {
        if (req.session.cookie)
            console.log("coming here with cookie");
        if (req.session.user) {
            console.log("coming here with user");
            req.session.destroy();
        }
        req.session.sessionFlash = {
            type: 'failed',
            messgae: '1'
        }
        console.log("Logging you out");
        req.flash('message', json.logged_out);
        return res.redirect('/');
    }
})
app.use((req, res, next) => {
    if (req.session.user && req.session.cookie) {
        next();
    }
    else {
        return res.redirect('/logout');
    }
})
app.get('/selectGame', (req, res) => {
    console.log("Do I have the session path here", req.session.user.path);
    req.session.sessionFlash = {
        type: 'failed',
        messgae: '1'
    }
    req.flash('path', req.session.user.path);
    res.render('pages/Home.ejs')
});
app.get('/start', (req, res) => {
    req.session.sessionFlash = {
        type: 'failed',
        messgae: '1'
    }
    req.flash('path', req.session.user.path);
    req.flash('message', req.session.user.name);
    res.render('pages/Design.ejs');
});
module.exports = app; 
