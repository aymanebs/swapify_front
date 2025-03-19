import React from 'react';
import { MessageCircle, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { daysPassed } from '../helpers/daysPassed';
import { getImageUrl } from '../helpers/getImageUrl';

const SentRequests = ({ requests, onStartChat }) => {

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {requests.map((request) => (
        <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img 
                  src={request.receiver?.avatar} 
                  alt={request.receiver?.first_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{request.receiver?.first_name + ' ' + request.receiver?.last_name }</h3>
                  <p className="text-sm text-gray-500">Sent {daysPassed(request.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusClass(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="ml-2 capitalize">{request.status}</span>
                </span>
                {/* {request.status === 'accepted' && (
                  <button
                    onClick={() => onStartChat(request._id, request?.receiver._id)}
                    className="flex items-center px-3 py-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </button>
                )} */}
              </div>
            </div>
            
            <div className="mt-6 flex">
              <div className="flex-1 pr-4 border-r border-gray-200">
                <p className="text-sm font-medium text-gray-500">You offered:</p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <img 
                      src={getImageUrl(request.itemOffered?.photos[0])} 
                      alt={request.itemOffered?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-800">{request.itemOffered?.name}</h4>
                      <p className="text-sm text-gray-500">{request.itemOffered?.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 pl-4">
                <p className="text-sm font-medium text-gray-500">For their:</p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <img 
                      src={getImageUrl(request.requestedItem?.photos[0])} 
                      alt={request.requestedItem?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-800">{request.itemRequested?.name}</h4>
                      <p className="text-sm text-gray-500">{request.itemRequested?.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {request.message && (
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">Your message: {request.message}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentRequests;