const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

//creates a WebSocket server instance and associates it with the HTTP server
const wss = new WebSocket.Server({ server:server });

//fires when a client establishes a WebSocket connection
wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

//fires when a message is received from a client  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

//Iterates over all connected WebSocket clients    
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))
