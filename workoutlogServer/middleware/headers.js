// this is middleware, it allows CORS to run.//
//Using CORS, a server can explicitly allow some cross-origin requests while rejecting others.//
//  Different portAlso to note, same origin means URLs have identical ports or hosts. For instance, these have the same origin:


		//http://workoutlog.com/define.html
		//http://workoutlog.com/history.html

//These don’t have the same origin:
		//http://workoutlog.net/: Different domain
		//http://workoutlog.com:8000/history.html: //

		module.exports = function(req, res, next){
			res.header('access-control-allow-origin', '*');
			next();
		};