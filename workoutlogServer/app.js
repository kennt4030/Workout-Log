//Here we’re importing the express module with the first variable. Then, we are calling the express function in the app variable. This function puts a new Express application inside the app variable. This is creating an instance of Express that we can use to call the various Express functions that will help us build our server.//
var express = require('express');
var app = express();

// this is the header file//
app.use(require('./middleware/headers'))

//We’re going to create a test api. In app.js in the server directory, add the following code under the other variables but before the app.listen on around://
app.use('/api/test', function(req,res){
    res.send('Hello World')
})

//Add app.listen, so that the server will start up when it is run on Port 3000. Then, we’ll pass a simple callback with a console.log inside that tells us that the server is on//
app.listen(3000, function(){
    console.log("app is open on 3000!");
})

// run nodemon app.js to start the server//
