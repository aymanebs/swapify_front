import React, { useState } from 'react';
import { Package2, Cuboid as Cube, Star, Shield, Camera, UserCheck, ArrowRight, RefreshCw, Check, MessageCircle } from 'lucide-react';

const SwapProposal = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [showInfo, setShowInfo] = useState(null);

  const myItems = [
    {
      id: 1,
      name: "Professional DSLR Camera",
      description: "Nikon D750 with 24-70mm lens, excellent condition",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
      value: 850,
      condition: "Excellent",
      age: "2 years",
      swapCount: 3
    },
    {
      id: 2,
      name: "Audio Interface",
      description: "Focusrite Scarlett 4i4, barely used",
      image: "https://images.unsplash.com/photo-1598335624134-5bceb5de202b?auto=format&fit=crop&q=80&w=200&h=200",
      value: 320,
      condition: "Like New",
      age: "8 months",
      swapCount: 0
    },
    {
      id: 3,
      name: "Vintage Lens Collection",
      description: "Set of 3 manual prime lenses in leather case",
      image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=200&h=200",
      value: 590,
      condition: "Good",
      age: "30+ years",
      swapCount: 1
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Proposal submitted:', { selectedItem, message });
  };
  
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
  };

  const swapTargetItem = {
    name: "Focusrite Scarlett 2i2 Audio Interface",
    image: "https://images.unsplash.com/photo-1598335624134-5bceb5de202b?auto=format&fit=crop&q=80&w=200&h=200",
    value: 280,
    owner: "John Smith"
  };

  return (
    <div className="bg-gradient-to-br from-white to-sky-50 rounded-xl shadow-xl p-8 border border-sky-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 text-transparent bg-clip-text flex items-center">
            <RefreshCw className="h-6 w-6 mr-2 text-sky-600" />
            Make a Swap Proposal
          </h2>
          <p className="text-gray-600 mt-1">Select an item to trade for {swapTargetItem.owner}'s {swapTargetItem.name}</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 p-2 bg-gradient-to-r from-sky-50 to-sky-50 rounded-lg shadow-inner">
          <Shield className="h-5 w-5 text-sky-600" />
          <span className="ml-2 text-sm font-medium text-sky-800">Premium Swap Protection</span>
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
                  src={myItems.find(item => item.id === selectedItem).image} 
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
              {selectedItem ? myItems.find(item => item.id === selectedItem).name : "Select an item below"}
            </p>
            {selectedItem && (
              <p className="text-xs text-gray-500">${myItems.find(item => item.id === selectedItem).value} estimated value</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center my-4 md:my-0">
          <ArrowRight className="hidden md:block h-6 w-6 text-sky-500 mx-6" />
          <div className="md:hidden h-px w-24 bg-gradient-to-r from-transparent via-sky-300 to-transparent my-2"></div>
        </div>
        
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md">
            <img 
              src={swapTargetItem.image} 
              alt={swapTargetItem.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Their Item</p>
            <p className="font-medium text-gray-900">{swapTargetItem.name}</p>
            <p className="text-xs text-gray-500">${swapTargetItem.value} estimated value</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myItems.map((item) => (
              <div
                key={item.id}
                className={`group relative rounded-xl transition-all duration-300 overflow-hidden ${
                  selectedItem === item.id
                    ? 'ring-4 ring-sky-500 ring-offset-2 scale-105 z-10'
                    : 'hover:shadow-2xl hover:translate-y-1 border border-gray-200'
                }`}
                onClick={() => setSelectedItem(item.id)}
                onMouseEnter={() => setShowInfo(item.id)}
                onMouseLeave={() => setShowInfo(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-80" />
                  
                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      ${item.value}
                    </span>
                    <span className="bg-sky-500/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.condition}
                    </span>
                  </div>
                  
                  {/* Item name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                    <p className="text-sm text-gray-200 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
                
                {/* Additional info panel */}
                <div className={`p-4 bg-white border-t border-gray-100 ${selectedItem === item.id ? 'bg-sky-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Package2 className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-2">
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">{item.age}</p>
                      </div>
                    </div>
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
        </div>

        <div className="space-y-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <label className="block text-lg font-semibold text-gray-900 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-sky-600" />
            Message to seller
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Introduce yourself and explain why you'd like to swap
          </p>
          <div className="relative">
            <textarea
              rows={4}
              className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-30 resize-none"
              placeholder="Hi! I'm interested in swapping because..."
              value={message}
              onChange={handleMessageChange}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {messageLength}/500
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <UserCheck className="h-4 w-4 text-green-500 mr-2" />
            <span>Messages are shared only with the item owner</span>
          </div>
        </div>

        <button
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