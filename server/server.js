// Very simple websocket server: echo incoming message to all connected clients
var ws = require('nodejs-websocket');
var server = ws.createServer(socketConnection).listen(3005);

function socketConnection(conn) {
	console.log('New connection established.', new Date().toLocaleTimeString());
	
	conn.on('text', function (msg) {
		// simple object transformation (= add current time)
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj)
		
		// echo message including the new field to all connected clients
		server.connections.forEach(function (conn) {
			conn.sendText(newMsg);
		})
	})
	conn.on('close', function (code, reason) {		
		console.log('Connection closed.', new Date().toLocaleTimeString());
	})
}