import React, { useState } from 'react';
import { Check, X, CheckCircle } from 'lucide-react';
import { daysPassed } from '../helpers/daysPassed';
import { getImageUrl } from '../helpers/getImageUrl';
import ConfirmationModal from './confirmationModal';

const ReceivedRequests = ({ requests, onAccept, onRefuse, onComplete, onCancel }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    confirmText: '',
    confirmButtonClass: '',
    onConfirm: () => {},
  });

  const showConfirmModal = (config) => {
    setModalConfig(config);
    setModalOpen(true);
  };

  
  const statusActions = {
    pending: (requestId, request) => (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => showConfirmModal({
            title: 'Accept Request',
            message: `Are you sure you want to accept the request from ${request.sender.first_name} to exchange "${request.itemRequested.name}" for "${request.itemOffered.name}"?`,
            confirmText: 'Accept',
            confirmButtonClass: 'bg-sky-600 hover:bg-sky-700',
            onConfirm: () => onAccept(requestId)
          })}
          className="flex items-center px-3 py-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition text-sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Accept
        </button>
        <button
          onClick={() => showConfirmModal({
            title: 'Refuse Request',
            message: `Are you sure you want to refuse the request from ${request.sender.first_name}?`,
            confirmText: 'Refuse',
            confirmButtonClass: 'bg-gray-600 hover:bg-gray-700',
            onConfirm: () => onRefuse(requestId)
          })}
          className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm"
        >
          <X className="h-4 w-4 mr-1" />
          Refuse
        </button>
      </div>
    ),
    accepted: (requestId, request) => (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => showConfirmModal({
            title: 'Complete Exchange',
            message: `Have you completed the exchange with ${request.sender.first_name}?`,
            confirmText: 'Complete',
            confirmButtonClass: 'bg-green-600 hover:bg-green-700',
            onConfirm: () => onComplete(requestId)
          })}
          className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Complete
        </button>
        <button
          onClick={() => showConfirmModal({
            title: 'Cancel Exchange',
            message: `Are you sure you want to cancel this exchange with ${request.sender.first_name}?`,
            confirmText: 'Cancel',
            confirmButtonClass: 'bg-red-600 hover:bg-red-700',
            onConfirm: () => onCancel(requestId)
          })}
          className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </button>
      </div>
    ),
    completed: () => (
      <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-sm">
        <CheckCircle className="h-4 w-4 mr-1" />
        Completed
      </div>
    ),
    rejected: () => (
      <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm">
        <X className="h-4 w-4 mr-1" />
        Rejected
      </div>
    )
  };

  const statusBadges = {
    pending: (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    ),
    accepted: (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Accepted
      </span>
    ),
    completed: (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Completed
      </span>
    ),
    rejected: (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Rejected
      </span>
    )
  };
  
  return (
    <>
      <div className="space-y-6">
        {requests.map((request) => (
          <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-center">
                  <img 
                    src={request?.sender?.avatar} 
                    alt={request?.sender?.first_name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-semibold text-gray-800">{request?.sender?.first_name + ' ' + request?.sender?.last_name}</h3>
                    <div className="flex items-center flex-wrap gap-2">
                      <p className="text-xs sm:text-sm text-gray-500">Requested {daysPassed(request.createdAt)}</p>
                      {statusBadges[request.status] || null}
                    </div>
                  </div>
                </div>
                
                <div className="w-full sm:w-auto">
                  {statusActions[request.status] ? statusActions[request.status](request._id, request) : null}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row">
                <div className="flex-1 pr-0 sm:pr-4 border-r-0 sm:border-r border-gray-200 mb-4 sm:mb-0">
                  <p className="text-sm font-medium text-gray-500">They want your:</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <img 
                        src={getImageUrl(request.itemRequested?.photos[0])} 
                        alt={request.itemRequested?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">{request.itemRequested?.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{request.itemRequested?.condition}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 pl-0 sm:pl-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                  <p className="text-sm font-medium text-gray-500">In exchange for:</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <img 
                        src={getImageUrl(request.itemOffered?.photos[0])} 
                        alt={request.itemOffered?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">{request.itemOffered?.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{request.itemOffered?.condition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {request.message && (
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <p className="text-xs sm:text-sm text-gray-600">{request.message}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmButtonClass={modalConfig.confirmButtonClass}
      />
    </>
  );
};

export default ReceivedRequests;