import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Phone, Video, MoreHorizontal, Paperclip, Smile, Mic, Clock, Shield } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'other',
      text: "Hi! I'm interested in your vintage camera. Would you consider swapping it for my professional audio interface?",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      sender: 'user',
      text: "Hello! Yes, I'd be interested. Could you tell me more about the audio interface? What's the condition and brand?",
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: 3,
      sender: 'other',
      text: "It's a Focusrite Scarlett 2i2 3rd Gen, purchased last year. Barely used and in excellent condition. I can send some photos if you'd like.",
      timestamp: new Date(Date.now() - 2400000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Simulate typing indicator
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (messages[messages.length - 1].sender === 'user') {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    }, 1000);
    
    return () => clearTimeout(typingTimer);
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-xl h-[calc(100vh-12rem)] overflow-hidden border border-blue-100">
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur-lg shadow-sm border-b border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-md flex items-center justify-center ring-2 ring-white">
                  <span className="text-white font-semibold text-lg">JS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-400 border-2 border-white shadow-md flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white animate-ping"></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">John Smith</h3>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-green-600 font-medium">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="ml-2 flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Schedule Meet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-blue-50/30 to-white/60 backdrop-blur-sm">
          <div className="flex justify-center">
            <div className="px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-800 font-medium">
              Today
            </div>
          </div>
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'other' && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium text-sm mr-2 mt-2 shadow-sm">
                  JS
                </div>
              )}
              <div
                className={`max-w-[70%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl rounded-bl-2xl shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-t-2xl rounded-br-2xl shadow-md'
                } p-4`}
              >
                <p className="text-[15px] leading-relaxed">{message.text}</p>
                <div className="flex justify-between items-center mt-2">
                  <p
                    className={`text-xs ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  {message.sender === 'user' && (
                    <svg className="h-4 w-4 text-blue-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium text-sm mr-2 shadow-sm">
                JS
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-blue-100 shadow-inner">
          <form onSubmit={handleSend} className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-2">
              <button
                type="button"
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-full border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pl-4 pr-12 py-3 shadow-inner"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-2 flex justify-center">
            <div className="text-xs text-gray-500 flex items-center">
              <Shield className="h-3 w-3 text-blue-500 mr-1" />
              Messages are secured with end-to-end encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;