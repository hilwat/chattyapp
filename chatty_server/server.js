const express = require('express');
const webSocket = require('ws');
const SocketServer = webSocket.Server;
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const usersOnline= {
	counter: wss.clients.size,
	type: "userUpdate"
 	};
	 
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
	  if (client.readyState === webSocket.OPEN) {
		client.send(data);
	  }
	});
  };

// Callback that will run when a client connects to the server
// Assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
	console.log('Client connected');
	
	if (ws) {
		usersOnline.counter++
		//future add const colour = generate colour function
		//future const create obj = with users colour
	};

  wss.broadcast(JSON.stringify(usersOnline));
	
	ws.on('message', handleMessage)
	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
	ws.on('close', handleClose)
});

const handleClose = () => {
	console.log('Client disconnected');
	usersOnline.counter--;
	wss.broadcast(JSON.stringify(usersOnline));
}

const handleMessage = data  => {
	const message = JSON.parse(data);
	const uniqueID  = uuidv4();
	const formattedResponse = {
		id: uniqueID, ...message
	}
	wss.broadcast(JSON.stringify(formattedResponse));
}
