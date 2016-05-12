var connect = require('connect');
var serveStatic = require('serve-static');
var startServer=require('./server_1');
var httpServer=connect().use(serveStatic(__dirname)).listen(8080, 
	function(){
		console.log('Server running on 8080...');
	});
startServer.start(httpServer)