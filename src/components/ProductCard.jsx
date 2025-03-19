import { Heart, Package } from "lucide-react";
import { getImageUrl } from "../helpers/getImageUrl";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {

  const navigate = useNavigate();
  
  return (
    <div
      key={item._id}
      className="group bg-white rounded-xl shadow-sm overflow-hidden border border-sky-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img
          src={getImageUrl(item?.photos[0])}
          alt={item.name}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110">
          <Heart className="w-5 h-5 text-sky-600" />
        </button>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:translate-y-[-4px]"></div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
            {item.name}
          </h3>
        </div>
        <div className="flex items-center text-sm text-sky-500 mb-4">
          <Package className="w-4 h-4 mr-1.5" />
          <span>{item.condition}</span>
          <span className="mx-2">•</span>
          <span>{item.category.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-sky-400">New York, NY</span>
          <button
            onClick={() => navigate(`/itemDetails/${item._id}`)}
            className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors group-hover:bg-sky-600 group-hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
