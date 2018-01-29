//Here we’re importing the express module with the first variable. Then, we are calling the express function in the app variable. This function puts a new Express application inside the app variable. This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// this is the header file//
app.use(require('./middleware/headers'))

//We’re going to create a test api. In app.js in the server directory, add the following code under the other variables but before the app.listen on around://
app.use('/api/test', function(req,res){
    res.send('Hello World')
})

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'hunter09', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log('connected to workoutlog postgres db');
    },
    function(err){
        console.log(err);
    }
);

var user = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
});
user.sync();
app.post('/api/user', function(req, res){
    //when we post to api user, it will want a user object in the body//
    var username = req.body.user.username;
    var pass = req.body.user.password;  //TODO: hash this password - HASH=not readable by humans//

    //match the model we create above//
    // sequelize - take the user model and go out to the D.B. and create this:
    user.create({
        username: username,
        passwordhash: ''
}).then(
        //sequelize is going to return the object it created from the D.B.//
        function createSuccess(user){
            // if successful you get this:
            res.json({
            user: user,
            message: 'create'
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

//Add app.listen, so that the server will start up when it is run on Port 3000. Then, we’ll pass a simple callback with a console.log inside that tells us that the server is on//
app.listen(3000, function(){
    console.log("app is open on 3000!");
})





// run nodemon app.js to start the server//
