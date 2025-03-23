// src/socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });

// Identify user
export const identifyUser = (userId) => {
  socket.emit('identify', userId);
};

// Listen for trade requests
export const onTradeRequestReceived = (callback) => {
  socket.on('tradeRequestCreated', callback);
};

// Listen for new chats
export const onChatCreated = (callback) => {
  socket.on('chatCreated', callback);
};

// Listen for new messages
export const onNewMessage = (callback) => {
  socket.on('newMessage', callback);
};

// Join a chat room
export const joinChat = (chatId) => {
  socket.emit('joinChat', chatId);
};

// Send a message
export const sendMessage = (messageData) => {
  socket.emit('sendMessage', messageData);
};

// Listen for the requestCompleted event
socket.on('requestCompleted', (data) => {
  console.log('Request completed:', data);
  // Redirect the user to the rating page
  window.location.href = `/rate/${data.receiverId}?requestId=${data.requestId}`;
});

// Listen for item deleted notifications
export const onItemDeleted = (callback) => {
  socket.on('itemDeleted', callback);
};



export default socket;