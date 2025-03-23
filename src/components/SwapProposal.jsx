import React, { useState } from 'react';
import { Package2, Cuboid as Cube, Star, Shield, Camera, UserCheck, ArrowRight, RefreshCw, Check, MessageCircle, Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../helpers/getImageUrl';

const SwapProposal = ({senderItems,targetItem, submit}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [showInfo, setShowInfo] = useState(null);

console.log('loging targetItem',targetItem);
console.log('logging selectedItem: ',selectedItem);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {receiver: targetItem.userId._id, itemOffered: selectedItem, itemRequested: targetItem._id};
    submit(data);
  };
  
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
  };

  return (
    <div className="bg-gradient-to-br from-white to-sky-50 rounded-xl shadow-xl p-8 border border-sky-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 text-transparent bg-clip-text flex items-center">
            <RefreshCw className="h-6 w-6 mr-2 text-sky-600" />
            Make a Swap Proposal
          </h2>
        </div>

      </div>
      
      {/* Swap Items Overview */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-400/20 animate-pulse group-hover:opacity-0 transition-opacity"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md">
              {selectedItem ? (
                <img 
                  src={getImageUrl(senderItems.find(item => item._id === selectedItem)?.photos[0])} 
                  alt="Your selected item"
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Your Item</p>
            <p className="font-medium text-gray-900">
              {selectedItem ? senderItems.find(item => item._id === selectedItem)?.name : "Select an item below"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center my-4 md:my-0">
          <ArrowRight className="hidden md:block h-6 w-6 text-sky-500 mx-6" />
          <div className="md:hidden h-px w-24 bg-gradient-to-r from-transparent via-sky-300 to-transparent my-2"></div>
        </div>
        
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md">
            <img 
              src={getImageUrl(targetItem?.photos[0])} 
              alt={targetItem?.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Target Item</p>
            <p className="font-medium text-gray-900">{targetItem?.name}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-lg font-semibold text-gray-900">
              <Package2 className="h-5 w-5 mr-2 text-sky-600" />
              Select an item to offer
            </label>
            <span className="text-sm text-sky-600 font-medium">{selectedItem ? '1' : '0'}/1 Selected</span>
          </div>
          {
            senderItems && senderItems.length> 0 ?
            (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {senderItems.map((item) => (
                <div
                  key={item._id}
                  className={`group relative rounded-xl transition-all duration-300 overflow-hidden ${
                    selectedItem === item._id
                      ? 'ring-4 ring-sky-500 ring-offset-2 scale-105 z-10'
                      : 'hover:shadow-2xl hover:translate-y-1 border border-gray-200'
                  }`}
                  onClick={() => setSelectedItem(item._id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(item.photos[0])}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-80" />
                    
                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <span className="bg-sky-500/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                        {item.condition}
                      </span>
                    </div>
                    
                    {/* Item name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                    </div>
                  </div>
                  
                  {/* Additional info panel */}
                  <div className={`p-4 bg-white border-t border-gray-100 ${selectedItem === item.id ? 'bg-sky-50' : ''}`}>
                    <div className="flex items-center justify-between">
            
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <RefreshCw className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-2">
                          <p className="text-xs text-gray-500">Swaps</p>
                          <p className="text-sm font-medium text-gray-900">{item.swapCount}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Selection indicator */}
                    {selectedItem === item.id && (
                      <div className="mt-3 flex items-center justify-center bg-sky-600 text-white rounded-lg p-2">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Selected for Swap</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            ):
            (
              <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-gray-50 rounded-xl p-8 text-center w-full max-w-md border border-gray-200">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No items available</h3>
                <p className="text-gray-500 mb-6">You haven't added any items to swap yet.</p>
                <Link 
                  to="/profile" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add Items to Swap</span>
                </Link>
              </div>
            </div>
            )
          }
        

        </div>

        <button
          onSubmit={handleSubmit}
          type="submit"
          disabled={!selectedItem}
          className={`w-full px-6 py-4 rounded-xl shadow-lg flex items-center justify-center space-x-3 font-semibold text-lg transition-all duration-300 ${
            selectedItem 
              ? 'bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 text-white transform hover:-translate-y-1 hover:shadow-xl' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Cube className="h-5 w-5" />
          <span>Propose Swap</span>
          <ArrowRight className="h-5 w-5 ml-2 animate-pulse" />
        </button>
      </form>
      
      {/* Trust indicators */}
      <div className="mt-8 flex items-center justify-center space-x-6 text-center p-4 bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-xs text-gray-700">Secure Swap</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mb-2">
            <UserCheck className="h-5 w-5 text-sky-600" />
          </div>
          <span className="text-xs text-gray-700">Verified Users</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <Star className="h-5 w-5 text-purple-600" />
          </div>
          <span className="text-xs text-gray-700">Rated Trading</span>
        </div>
      </div>
    </div>
  );
};

export default SwapProposal;