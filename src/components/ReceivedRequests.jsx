import React from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import { daysPassed } from '../helpers/daysPassed';

const ReceivedRequests = ({ requests, onAccept, onRefuse }) => {
  
  return (
    <div className="space-y-6">
      {requests.map((request) => (
        <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img 
                  src={request?.sender?.avatar} 
                  alt={request?.sender?.first_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{request?.sender?.first_name + ' ' + request?.sender?.last_name }</h3>
                  <p className="text-sm text-gray-500">Requested {daysPassed(request.createdAt)}</p>
                </div>
              </div>
             
                {request.status == "pending" &&
                (
                  <div className="flex space-x-2">
                  <button
                  onClick={() => onAccept(request._id)}
                  className="flex items-center px-3 py-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => onRefuse(request._id)}
                  className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  <X className="h-4 w-4 mr-1" />
                  Refuse
                </button>
                
                </div>
                )
                }
           
            
            </div>
            
            <div className="mt-6 flex">
              <div className="flex-1 pr-4 border-r border-gray-200">
                <p className="text-sm font-medium text-gray-500">They want your:</p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <img 
                      src={request.itemRequested?.photos} 
                      alt={request.itemRequested?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-800">{request.itemRequested?.name}</h4>
                      <p className="text-sm text-gray-500">{request.itemRequested?.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 pl-4">
                <p className="text-sm font-medium text-gray-500">In exchange for:</p>
                <div className="mt-2">
                  <div className="flex items-center">
                    <img 
                      src={request.itemOffered?.photos} 
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
            </div>
            
            {request.message && (
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">{request.message}</p>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-sky-600 hover:text-sky-700 flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                View full details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedRequests;