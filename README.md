# ng2-websockets
Example project of using WebSockets in an Angular 2 (.rc6) application

This project consists of two parts, a client (angular2.rc6) and server part (Nodejs)

## Server
- Download or clone the repo and run `npm install` in the server directory to install server dependencies.
- Currently the server only has a dependency on js-websockets
- Run `node server.js` or `nodemon server.js` to start the server.
- The server is started on localhost:3005.

The only purpose of this simple server is to start a websocket server and accept incoming connections. Once a message is posted to the server, it is transformed by adding the local time to the incoming object and it is echoed back to the client. 

## Client
- Download or clone the repo and run `npm install` to install dependencies.
- Make sure the server is already started before you try to start the client (as it is trying to connect to the ws-server on startup)
- run `npm start` to start the client.
- Typ a message in the messagebox. It should reappear in the list of messages.

Messages are always in the format of a Message-object in the following format:
`
interface Message {
	author: string,
	message: string,
	newDate?: string
}
`

the field newDate is added by the server.

This project is based on previous work by Łukasz Wojciechowski (https://github.com/lwojciechowski/mildchat-client), who also wrote [this great article] (https://medium.com/@lwojciechowski/websockets-with-angular2-and-rxjs-8b6c5be02fac#.v1d65auh8)  on Angular 2 and websockets.