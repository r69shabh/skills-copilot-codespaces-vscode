//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//Set view engine
app.set('view engine', 'ejs');

//Use body parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

//Set up a route for the home page
app.get('/', function(req, res) {
    res.render('index');
});

//Set up a route for the form
app.post('/submit', function(req, res) {
    var comment = req.body.comment;
    fs.appendFile('comments.txt', comment + '\n', function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving comment');
        } else {
            console.log('Comment saved: ' + comment);
            res.send('Comment saved: ' + comment);
        }
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
