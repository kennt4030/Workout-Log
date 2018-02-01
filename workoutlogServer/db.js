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


var User = sequelize.import('./models/user');
var Log = sequelize.import('./models/log');
var Definition = sequelize.import('./models/definition');

module.exports = sequelize;