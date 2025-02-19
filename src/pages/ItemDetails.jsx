import React, { useState } from 'react';
import { MessageCircle, Share2, Flag, Heart, UserCircle2, Star, MapPin, Calendar, Package } from 'lucide-react';

const ItemDetails = () => {
  

    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
  
    const images = [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9',
      'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'
    ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
    <main className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-6">
          <div className="relative group">
            <img
              src={images[selectedImage]}
              alt="Item"
              className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:shadow-xl"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300">
                <Flag className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-900">Premium Item</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedImage === i ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                } transition duration-200`}
              >
                <img
                  src={img}
                  alt={`Item view ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
                {selectedImage === i && (
                  <div className="absolute inset-0 bg-blue-500/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Vintage Camera</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">New York, NY</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">Listed 2 days ago</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-rose-50 text-rose-500' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <p className="text-3xl font-bold text-blue-700">Estimated Value: $299</p>
              <p className="text-blue-600 mt-1">Open to reasonable offers</p>
            </div>
          </div>

          <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                Professional vintage camera in excellent condition. Perfect for photography enthusiasts
                and collectors. Comes with original leather case and manual. Looking to swap for
                professional audio equipment or similar value items.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Item Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Condition</p>
                    <p className="font-medium text-gray-900">Excellent</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="font-medium text-gray-900">Electronics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <UserCircle2 className="w-14 h-14 text-gray-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">John Smith</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">Member since 2023</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full py-4 px-6 bg-gray-900 text-gray-50 font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message
              </button>
              <button className="w-full py-4 px-6 bg-blue-600 text-emerald-50 font-medium rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                Propose Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default ItemDetails;
