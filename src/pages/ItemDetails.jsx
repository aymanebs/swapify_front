import React, { useEffect, useState } from 'react';
import { MessageCircle, Share2, Flag, Heart, UserCircle2, Star, MapPin, Calendar, Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneItem } from '../services/itemsApi';
import { getUserAverageRating } from '../services/ratingApi';
import { useSelector } from 'react-redux';
import { daysPassed } from '../helpers/daysPassed';
import { getImageUrl } from '../helpers/getImageUrl';
import RenderStars from '../components/renderStars';

const ItemDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [item, setItem] = useState('');
  const [userRating, setUserRating] = useState(0);
  const { itemId } = useParams();
  let navigate = useNavigate();
  const user = useSelector((state) => state.users.loggedUser);

  console.log('item', item);
  

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await getOneItem(itemId);
        setItem(data);
        
        // Fetch user rating once we have the item data
        if (data && data.userId && data.userId._id) {
          fetchUserRating(data.userId._id);
        }
      }
      catch (error) {
        console.error('Failed to fetch the item: ', error);
      }
    }
    
    async function fetchUserRating(userId) {
      try {
        const rating = await getUserAverageRating(userId);
        setUserRating(rating);
      } catch (error) {
        console.error('Failed to fetch user rating: ', error);
        setUserRating(0);
      }
    }
    
    fetchItem();
  }, [itemId]);




  console.log('userRating: ',userRating);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
    <main className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="relative group">
            {item && (
              <img
                src={getImageUrl(item.photos[selectedImage])}
                alt="Item"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:shadow-xl"
              />
            )}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300">
                <Flag className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {item && (
              item.photos.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative rounded-lg overflow-hidden ${
                    selectedImage === i ? 'ring-2 ring-sky-500' : 'hover:opacity-80'
                  } transition duration-200`}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`Item view ${i + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  {selectedImage === i && (
                    <div className="absolute inset-0 bg-sky-500/10" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">New York, NY</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">Listed {daysPassed(item.createdAt)}</span>
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
          </div>

          <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
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
                    <p className="font-medium text-gray-900">{item.condition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="font-medium text-gray-900">{item?.category?.name}</p>
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
                  <h3 className="font-semibold text-lg text-gray-900">{item.userId?.first_name + ' ' + item.userId?.last_name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      <RenderStars
                        rating={userRating.averageRating}
                      />
                    </div>
                    {userRating > 0 && (
                      <span className="text-sm text-gray-600">({userRating.toFixed(1)})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {item && user._id != item.userId._id && (
                <button
                  className="w-full py-4 px-6 bg-sky-600 text-emerald-50 font-medium rounded-xl hover:bg-sky-800 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  onClick={() => navigate(`/swap/${itemId}`)}
                >
                  Propose Swap
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default ItemDetails;