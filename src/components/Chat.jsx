import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Paperclip, Image, Smile } from 'lucide-react';

const Chat = ({ 
  activeChat, 
  onClose, 
  currentUser 
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat messages when activeChat changes
  useEffect(() => {
    if (activeChat) {
      fetchMessages();
    }
  }, [activeChat]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      // const response = await getChatMessages(activeChat.id);
      // setMessages(response.data);
      
      // Mock data for demonstration
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            senderId: activeChat.user.id,
            text: "Hi there! I'm interested in swapping with you.",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 2,
            senderId: currentUser.id,
            text: "Thanks for accepting my swap request. When would you like to meet?",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
          },
          {
            id: 3,
            senderId: activeChat.user.id,
            text: "How about tomorrow at 3pm?",
            timestamp: new Date(Date.now() - 900000).toISOString(),
          }
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text: message,
      timestamp: new Date().toISOString(),
    };

    // Optimistically update UI
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    try {
      // Replace with actual API call to send message
      // await sendChatMessage(activeChat.id, message);
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Could remove the message from state if sending fails
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(msg => {
      const date = formatDate(msg.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    
    return groups;
  };

  if (!activeChat) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white rounded-lg p-6">
        <div className="text-center">
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <img 
            src={activeChat.user.avatar} 
            alt={activeChat.user.first_name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">
              {activeChat.user.first_name} {activeChat.user.last_name}
            </h3>
            <p className="text-sm text-gray-500">
              {activeChat.item ? `Swapping: ${activeChat.item.name}` : 'Exchange Accepted'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date} className="mb-4">
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                  {date}
                </span>
              </div>
              {msgs.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex mb-4 ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === currentUser.id 
                        ? 'bg-sky-600 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        msg.senderId === currentUser.id ? 'text-sky-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="border-t p-3">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <div className="flex space-x-1">
            <button 
              type="button"
              className="text-gray-500 hover:text-sky-600 p-1 rounded-full hover:bg-gray-200"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="text-gray-500 hover:text-sky-600 p-1 rounded-full hover:bg-gray-200"
            >
              <Image className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="text-gray-500 hover:text-sky-600 p-1 rounded-full hover:bg-gray-200"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
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