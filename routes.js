var express = require('express');
var app = express();
app.use(express.static(__dirname + '/views'));
app.get('/', (req, res) => {
    res.render('pages/Home.ejs');
});
app.get('/start', (req, res) => {
    res.render('pages/Design.ejs');
});
module.exports=app;