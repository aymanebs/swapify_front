import { io } from 'socket.io-client';
import { createMessage } from './messagesApi';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });

// Function to identify user with their ID
export const identifyUser = (userId) => {
  if (socket.connected) {
    console.log('🟢 Socket is connected:', socket.id);
    
    // Leave all previous rooms before rejoining
    socket.emit('leaveAllRooms');

    socket.emit('identify', userId);
    
    socket.once('roomJoined', (joinedRoom) => {
      console.log(`🔵 User successfully joined room: ${joinedRoom}`);
    });

    socket.on('updatedRooms', (rooms) => {
      console.log('🔵 Updated rooms:', rooms);
    });
  } else {
    socket.once('connect', () => {
      console.log('Socket reconnected, sending identify event...');
      
      // Leave previous rooms before identifying again
      socket.emit('leaveAllRooms');

      socket.emit('identify', userId);

      socket.once('roomJoined', (joinedRoom) => {
        console.log(`🔵 User successfully joined room: ${joinedRoom}`);
      });

      socket.on('updatedRooms', (rooms) => {
        console.log('🔵 Updated rooms:', rooms);
      });
    });
  }
};

// Listen for trade request notifications
export const onTradeRequestReceived = (callback) => {
  socket.on('tradeRequestCreated', (payload) => {
    callback(payload);
  });
};

// Listen for new chats
export const onChatCreated = (callback) => {
  console.log("Checking socket connection before listening...");
  console.log("Socket connected:", socket.connected);

  socket.on('chatCreated', (chat) => {
    console.log("🔥 New chat received:", chat);
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
