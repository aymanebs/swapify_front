import React, { useState, useEffect } from 'react';
import { Share2, ArrowLeft, Info, Shield, ChevronRight, Star, Bell, Clock, Users } from 'lucide-react';
import SwapProposal from '../components/SwapProposal';
import Chat from '../components/Chat';

function Swap() {
  const [view, setView] = useState('swap');
  const [animateBackground, setAnimateBackground] = useState(false);
  
  const swapDetails = {
    itemOffered: "Professional DSLR Camera",
    itemWanted: "Focusrite Scarlett 2i2 Audio Interface",
    otherUser: "John Smith",
    lastActive: "2 hours ago",
    userRating: 4.8,
    completedSwaps: 27
  };

  useEffect(() => {
    setAnimateBackground(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-purple-50 overflow-x-hidden">
      <div className="fixed top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-300/10 to-purple-300/20 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-200/10 to-sky-300/15 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      {/* Main content */}
      <div className="relative w-full mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <button className="flex items-center text-gray-600 hover:text-sky-600 transition-colors group">
            <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm group-hover:bg-sky-100 transition-all">
              <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="ml-2 text-sm font-medium">Back to Item Details</span>
          </button>
        </div>

        {/*  Context Banner */}
        <div className={`bg-gradient-to-r from-white to-sky-50 border border-sky-100 rounded-xl shadow-lg mb-8 overflow-hidden max-w-7xl mx-auto transform transition-all duration-700 ${animateBackground ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between relative">
            <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-br from-sky-100/40 to-sky-200/30 blur-md"></div>
            
            <div className="relative z-10 max-w-full">
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-full p-2 shadow-md">
                  <Share2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-gray-900">Swap Proposal</h2>
              </div>
              <p className="text-gray-700 mb-5 text-lg">
                Exchange your <span className="font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded">{swapDetails.itemOffered}</span> for a <span className="font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded">{swapDetails.itemWanted}</span>
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <div className="relative mr-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-medium">JS</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white shadow-sm" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 flex items-center">
                    {swapDetails.otherUser}
                    <div className="ml-2 flex items-center bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-yellow-700">{swapDetails.userRating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center mt-0.5 gap-3">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-gray-400" />
                      Last active {swapDetails.lastActive}
                    </span>
                    <span className="text-gray-500 flex items-center">
                      <Users className="h-3 w-3 mr-1 text-gray-400" />
                      {swapDetails.completedSwaps} swaps completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-6 sm:mt-0 bg-gradient-to-r from-sky-600/10 to-sky-600/10 backdrop-blur-sm px-5 py-3 rounded-lg border border-sky-200 z-10">
              <Shield className="h-5 w-5 text-sky-600 mr-2" />
              <span className="text-sm text-sky-700 font-medium">Swap Protection Enabled</span>
              <span className="ml-2 px-1.5 py-0.5 bg-sky-100 text-sky-800 text-xs rounded">Premium</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <div className="flex">
                <button
                  className={`relative py-5 px-8 focus:outline-none transition-all duration-300 ${
                    view === 'swap'
                      ? 'text-sky-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setView('swap')}
                >
                  Make Offer
                  {view === 'swap' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-600 to-sky-600"></div>
                  )}
                </button>
                <button
                  className={`relative py-5 px-8 focus:outline-none transition-all duration-300 ${
                    view === 'chat'
                      ? 'text-sky-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setView('chat')}
                >
                  <div className="flex items-center">
                    Chat
                    <div className="ml-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">3</span>
                    </div>
                  </div>
                  {view === 'chat' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-600 to-sky-600"></div>
                  )}
                </button>
              </div>
            </div>

            {view === 'swap' && (
              <div className="bg-gradient-to-r from-gray-50 to-sky-50 px-4 sm:px-8 py-5 flex items-center justify-between border-b border-gray-100 overflow-x-auto">
                <div className="flex items-center space-x-4 sm:space-x-8 min-w-max">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white flex items-center justify-center font-medium shadow-md">1</div>
                    <span className="text-xs mt-2 text-sky-700 font-medium">Select Item</span>
                  </div>
                  <div className="w-12 sm:w-16 h-1 rounded-full bg-gradient-to-r from-sky-200 to-sky-200"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-medium border border-gray-200 shadow-sm">2</div>
                    <span className="text-xs mt-2 text-gray-500">Propose Terms</span>
                  </div>
                  <div className="w-12 sm:w-16 h-1 rounded-full bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-medium border border-gray-200 shadow-sm">3</div>
                    <span className="text-xs mt-2 text-gray-500">Confirm Swap</span>
                  </div>
                </div>
                <button className="text-sm text-gray-600 hover:text-sky-600 flex items-center bg-white/80 px-4 py-2 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md ml-4 flex-shrink-0">
                  <Info className="h-4 w-4 mr-2" />
                  How it works
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8">
              {view === 'swap' ? <SwapProposal /> : <Chat />}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-white to-sky-50 p-6 sm:p-7 rounded-xl shadow-lg border border-sky-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-br from-sky-100/20 to-sky-200/10 blur-md group-hover:scale-110 transition-transform duration-500"></div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-5 relative z-10">
                <div className="p-2 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg shadow-md mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                Swap Protection
              </h3>
              <p className="text-gray-600 mb-6 relative z-10">Our premium swap protection program ensures safe and secure exchanges between members with additional benefits.</p>
              <ul className="space-y-4 text-sm text-gray-600 mb-6 relative z-10">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white mr-3 shadow-sm">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Enhanced identity verification with ID check</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white mr-3 shadow-sm">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Priority dispute resolution with dedicated support</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white mr-3 shadow-sm">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>End-to-end encrypted messaging platform</p>
                </li>
              </ul>
              <a href="#" className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-sky-600 rounded-lg shadow-md hover:from-sky-700 hover:to-sky-700 transition-all">
                Learn more about Swap Protection
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-white to-purple-50 p-6 sm:p-7 rounded-xl shadow-lg border border-purple-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-br from-purple-100/20 to-sky-200/10 blur-md group-hover:scale-110 transition-transform duration-500"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-5 relative z-10">Smart Swap Tips</h3>
              <div className="space-y-5 relative z-10">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800 font-medium">
                        Always meet in a public place with surveillance for in-person exchanges.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-sky-50 to-sky-50 border-l-4 border-sky-400 p-4 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-sky-800 font-medium">
                        Take multiple high-resolution photos in good lighting and describe any flaws honestly.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-400 p-4 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-emerald-800 font-medium">
                        Check item serial numbers against theft databases before finalizing the swap.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="relative z-10 mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-sky-600 rounded-lg shadow-md hover:from-purple-700 hover:to-sky-700 transition-all">
                View all swap safety guidelines
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;