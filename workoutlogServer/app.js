//Here we’re importing the express module with the first variable. Then, we are calling the express function in the app variable. This function puts a new Express application inside the app variable. This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});







var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'hunter09', {
	host: 'localhost',
	dialect: 'postgres'
});



sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);


//Data Model
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

User.sync();
//User.sync({ force: true });
app.use(bodyParser.json());

app.post('/api/user', function(req, res) {
		var user = req.body.user.username;
		var pass = req.body.user.password;
		//Need to create a user object and use sequelize to put that user into
		//

		User.create({
			username: user,
			passwordhash: pass
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				res.json({
						user: user,
						message: 'you did it!!!'
				});
			},
			function createError(err){
				res.send(500, err.message);

			}
		);
	});
