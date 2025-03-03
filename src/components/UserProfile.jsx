import { Star, Shield, Clock, MessageCircle, Package, ThumbsUp, Award, AlertCircle, Calendar, RefreshCw } from 'lucide-react';


export default function UserProfile(){

    const user ={};
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-sky-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">My Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <img 
              src={user?.profileImage} 
              alt={user?.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-3 text-sky-600" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{user?.joinedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Package className="h-5 w-5 mr-3 text-sky-600" />
              <div>
                <p className="text-sm text-gray-500">Items Listed</p>
                <p className="font-medium">{user?.itemsListed}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700">
              <RefreshCw className="h-5 w-5 mr-3 text-sky-600" />
              <div>
                <p className="text-sm text-gray-500">Successful Swaps</p>
                <p className="font-medium">{user?.successfulSwaps}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
}