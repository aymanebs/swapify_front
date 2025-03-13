
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });

// Function to identify user with their ID
export const identifyUser = (userId) => {
  socket.emit('identify', userId);
};

// Listen for trade request notifications
export const onTradeRequestReceived = (callback) => {
  socket.on('tradeRequestCreated', (payload) => {
    callback(payload);
  });
};

export default socket;
