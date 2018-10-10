[status: unmaintained - though the code still works, this repository is not updated anymore]

# ng2-websockets
Example project of using WebSockets in an Angular 2 application.

This project consists of two parts, a client (angular 2.4, as of Feb.02.2017) and server part (Nodejs 4.x+).

## Server(s)
- Download or clone the repo and run `npm install` in the server directory to install server dependencies.
- Currently the server only has a dependency on js-websockets
- Run `node server.js` or `nodemon server.js` to start the server.
- A chat server is started on localhost:3005.
- A random data emitter is started on localhost:3006 (community: can this be done simpler??)

The only purpose of this simple server is to start a websocket server and accept incoming connections. Once a message is posted to the server, it is transformed by adding the local time to the incoming object and then echoed back to the client.

The other server emits a random number, every 1 second. It is displayed in the user interface. Think of this as an example for a "stock ticker", or the like. 

## Client
- Download or clone the repo and run `npm install` in the client directory to install dependencies.
- Make sure the server is already started before you try to start the client (as it is trying to connect to the ws-server on startup).
- run `npm start` to start the client.
- Typ a message in the messagebox. It should reappear in the list of messages.

Messages are always in the format of a Message-object in the following format:
```javascript
interface Message {
	author: string,
	message: string,
	newDate?: string
}
```

the field newDate is added by the server.

The number server emits just a simple random number 0 - 10,000.

## TODO
- ~~The server crashes if the client is reloaded - working on that, PR's welcome! For now: just restart the server with Ctrl+C and `nodemon server.js` again.~~
- Text is copied as many times as there are connected clients. 

## Credits
This project is based on previous work by Łukasz Wojciechowski (https://github.com/lwojciechowski/mildchat-client), who also wrote [this great article] (https://medium.com/@lwojciechowski/websockets-with-angular2-and-rxjs-8b6c5be02fac#.v1d65auh8)  on Angular 2 and websockets.
