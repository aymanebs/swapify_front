import React from 'react';
import { Search, MessageCircle } from 'lucide-react';


const ChatList = ({ chatList, onSelectChat, activeChat }) => {

  console.log('Logging chat list inside chat list...', chatList);


  if (!chatList || chatList.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No messages yet</p>
        <p className="text-gray-500 text-sm mt-1">
          Your conversations will appear here
        </p>
      </div>
    );
  }



  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-sky-600" />
          Messages
        </h2>
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="divide-y max-h-96 overflow-y-auto">
        {chatList.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
              activeChat && activeChat._id === chat._id ? 'bg-sky-50' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="relative">
                <img
                  src={chat.participants[0].avatar}
                  alt={chat.participants[0].first_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">
                    {chat.participants[0].first_name} {chat.participants[0].last_name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'No messages yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;