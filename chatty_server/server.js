const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// To assign different colors to different users.
const colors = ["#FF5733", "#5BA718", "#B82FD3", "#1E37D8"];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    const userMessage = {
        type: 'userCountMessage',
        count: wss.clients.size
    }
    // User count broadcast
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(userMessage)); 
    });

    // Executes when message received
    ws.on('message', (data) => {
        let message = JSON.parse(data);
        message["id"] = uuid();
        switch(message.type) {
            case "postMessage":
                console.log(`User ${message.username} said ${message.content}`);
                message["type"] = "incomingMessage";
                message["color"] = colors[Math.floor(Math.random() * 4)];
            break;
            case "postNotification":
                message["type"] = "incomingNotification";
            break;
            default:
                // show an error in the console if the message type is unknown
                throw new Error("Unknown event type " + data.type);
        }

        // Send formatted message to all clients
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(message)); 
        });
    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

