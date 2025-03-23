import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Paperclip, Image, Smile } from 'lucide-react';
import { getChatById } from '../services/chatsApi';
import socket from '../services/socketService';

const Chat = ({ activeChat, onClose, currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      fetchMessages();
      joinChatRoom(activeChat._id);
    }
  }, [activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const chat = await getChatById(activeChat._id);
      console.log('verifyting chat.messages: ',chat.messages);
      setMessages(chat.messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const joinChatRoom = (chatId) => {
    socket.emit('joinChat', chatId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    const newMessage = {
      chatId: activeChat._id, 
      sender: currentUser._id,
      content: message,
    };
  
    try {
      // Send the message via WebSocket
      socket.emit('sendMessage', newMessage);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Listen for new messages
  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <img
            src={activeChat.participants[0].avatar}
            alt={activeChat.participants[0].first_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">
              {activeChat.participants[0].first_name} {activeChat.participants[0].last_name}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex mb-4 ${
              msg.sender === currentUser._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === currentUser._id
                  ? 'bg-sky-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-3">
        <div className="flex items-center text-gray-800 bg-gray-100 rounded-lg px-3 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-0 focus:ring-0 outline-none px-3 py-1"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`rounded-full p-2 ${
              message.trim()
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;