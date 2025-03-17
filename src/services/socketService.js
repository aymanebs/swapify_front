import { io } from 'socket.io-client';
import { createMessage } from './messagesApi';

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

// Listen for new chats
export const onChatCreated = (callback) => {
  socket.on('chatCreated', (chat) => {
    callback(chat);
  });
};

// Listen for new messages
export const onNewMessage = (callback) => {
  socket.on('newMessage', (message) => {
    callback(message);
  });
};

export const sendMessage = async (messageData) => {
  try {
    await createMessage(messageData);

    socket.emit("sendMessage", messageData);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

// Join a chat room
export const joinChat = (chatId) => {
  socket.emit('joinChat', chatId);
};

// Leave a chat room
export const leaveChat = (chatId) => {
  socket.emit('leaveChat', chatId);
};

export default socket;
