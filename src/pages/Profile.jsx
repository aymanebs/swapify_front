import React from 'react';
import { Star, Shield, Clock, MessageCircle, Package, ThumbsUp, Award, AlertCircle } from 'lucide-react';

function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-blue-500" />
            <span className="text-xl text-black-600 font-semibold">Swapify</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">2</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="text-xl text-gray-600 font-semibold">John Smith</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">4.8</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">Member since 2022</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 border-b">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <div className="font-semibold text-gray-600">100%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <div className="font-semibold text-gray-600">24h</div>
              <div className="text-sm text-gray-600">Avg. Response Time</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="w-8 h-8 text-purple-500" />
              </div>
              <div className="font-semibold text-gray-600">156</div>
              <div className="text-sm text-gray-600">Completed Swaps</div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Verification</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Identity Verified</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-blue-500 " />
                <span className="text-sm text-gray-600">Trusted Swapper</span>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Recent Reviews</h2>
            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://images.unsplash.com/photo-${review === 1 ? '1494790108377-be9c29b29330' : '1527980965255-d3b416303d12'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-600">Sarah Johnson</div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 5 ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="mt-3 text-gray-600">
                    Great experience swapping with John! The item was exactly as described and the
                    transaction was smooth.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Profile;