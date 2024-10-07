// import WebSocket from 'ws';
import { WebSocketServer } from 'ws';

export const configureWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);

            // Broadcast message to all connected clients
            // wss.clients.forEach((client) => {
            //     if (client.readyState === WebSocket.OPEN) {
            //         client.send(message);
            //     }
            // });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.send('Welcome to WebSocket server!');
    });
};
