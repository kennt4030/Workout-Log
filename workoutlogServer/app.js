//Here we’re importing the express module with the first variable. Then, we are calling the express function in the app variable. This function puts a new Express application inside the app variable. This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.//
require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');
var User = sequelize.import('./models/user');

//Create table
sequelize.sync(); // sync( {force: true}), to drop then create each time the app starts!
User.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
// creating a user
app.use('/api/user', require('./routes/user'));
// logging in a user
app.use('/api/login', require('./routes/session'));
// localhost:3000/api/login/
app.use('/api/definition', require('./routes/definition'));

//app.use('/api/log', require('./routes/log'));

//app.use('/api/test', function(req, res){
	//res.send("<h1>Hello World</h1>");
//});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});



