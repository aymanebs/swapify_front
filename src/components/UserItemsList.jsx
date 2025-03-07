import { Edit, Trash2 } from 'lucide-react';

export default function ItemsList({ items,onEdit, onDelete }){


    if (items.length === 0 || !items) {
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't listed any items yet.</p>
            <p className="text-gray-500 mt-2">Add your first item to start swapping!</p>
          </div>
        );
      }
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              {/* <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div> */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="inline-block bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded">
                    {item.condition}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-sky-600"
                    onClick={()=>onEdit(item._id)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={() => onDelete(item._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}