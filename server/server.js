// 1.  Very simple websocket server:
// 	1a. Echo incoming message to all connected clients
// 	1b. Generate random numbers and emit to connected clients
var ws = require('nodejs-websocket');

// 2. Server for incoming/outgoing chats
var chatServer = ws.createServer(function (conn) {
	console.log('New Chat connection established.', new Date().toLocaleTimeString());
	conn.on('text', function (msg) {
		// simple object transformation (= add current time)
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj);

		// echo message including the new field to all connected clients
		chatServer.connections.forEach(function (conn) {
			conn.sendText(newMsg);
		});
	});
	conn.on('close', function (code, reason) {
		console.log('Chat connection closed.', new Date().toLocaleTimeString(), 'code: ', code);
	});

	conn.on('error', function (err) {
		// only throw if something else happens than Connection Reset
		if (err.code !== 'ECONNRESET') {
			console.log('Error in Chat Socket connection', err);
			throw  err;
		}
	})
}).listen(3005, function () {
	console.log('Chat socketserver running on localhost:3005');
});

// 3. Server for emitting random data.
// Is this best practice? Starting new server on another port, or can
// the original server (on 3005) listen to different URL for example and
// emit other data?
var dataServer = ws.createServer(function (conn) {
	console.log('New Random number connection established, ', new Date().toLocaleTimeString());

	conn.on('close', function (code, reason) {
		console.log('Data connection closed.', new Date().toLocaleTimeString(), 'code: ', code);
	});

	conn.on('error', function (err) {
		// only throw if something else happens than Connection Reset
		if (err.code !== 'ECONNRESET') {
			console.log('Error in random number server', err);
		}
	})
}).listen(3006, function () {
	console.log('Random number server running on localhost:3006');
});

// 4. Generate a random number between 0-10,000, every second
setInterval(function () {
	// Only emit numbers if there are active connections
	if (dataServer.connections.length > 0) {
		var randomNumber = (Math.floor(Math.random() * 10000) + 1).toString();
		console.log(randomNumber);
		dataServer.connections.forEach((function (conn) {
			conn.send(randomNumber)
		}));
	}
}, 1000);