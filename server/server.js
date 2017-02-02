// 1.  Very simple websocket server: echo incoming message to all connected clients
var ws = require('nodejs-websocket');

// 2. Server for incoming/outgoing chats
var chatServer = ws.createServer(socketConnection)
	.listen(3005, function () {
		console.log('Chat socketserver running on localhost:3005');
	});

// 3. Server for emitting random data.
// Is this best practice? Starting new server on another port, or can
// the original server (on 3005) listen to different URL for example and
// emit other data?
var dataServer = ws.createServer(dataConnection)
	.listen(3006, function () {
		console.log('Random data server running on localhost:3006');

	});

// 4. Handle chats
function socketConnection(conn) {
	console.log('New connection established.', new Date().toLocaleTimeString());

	conn.on('text', function (msg) {
		// simple object transformation (= add current time)
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj);

		// echo message including the new field to all connected clients
		chatServer.connections.forEach(function (conn) {
			conn.sendText(newMsg);
		})
	});
	conn.on('close', function (code, reason) {
		console.log('Connection closed.', new Date().toLocaleTimeString());
	})
}

// 5. Handle emitting random data
function dataConnection(conn) {
	console.log('New data connection established, ', new Date().toLocaleTimeString());

	// conn.on('listening', function () {
		setInterval(function () {
			dataServer.connections.forEach((function (conn) {
				// generate a random number between 0-10,000, every second
				var randomNumber = (Math.floor(Math.random() * 10000) + 1).toString();
				console.log(randomNumber);
				conn.send(randomNumber)
			}));
		}, 1000);
	// });

	conn.on('close', function (code, reason) {
		console.log('Data connection closed.', new Date().toLocaleTimeString());
	})

}