//Here we’re importing the express module with the first variable. Then, we are calling the express function in the app variable. This function puts a new Express application inside the app variable. This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import(__dirname + '\\models\\user');
//Create table
User.sync(); // sync( {force: true}), to drop then create each time the app starts!

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});
