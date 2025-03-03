import { UserCircle, Package, PlusCircle, Edit, Trash2, RefreshCw } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import ItemsList from '../components/UserItemsList';
import CreateItemForm from '../components/CreateItemForm';
import { useState } from 'react';


function Profile() {
  const [activeTab, setActiveTab] = useState('myItems');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: 'January 2023',
    itemsListed: 12,
    successfulSwaps: 8,
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80'
  };
  
  // Mock items data
  const [userItems, setUserItems] = useState([
    {
      id: '1',
      name: 'Vintage Camera',
      description: 'A well-preserved vintage film camera from the 1980s. Perfect for photography enthusiasts.',
      condition: 'Good',
      categoryId: '123456789012',
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      name: 'Leather Jacket',
      description: 'Genuine leather jacket, barely worn. Size M, black color with minimal detailing.',
      condition: 'Like New',
      categoryId: '123456789013',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality. Battery lasts up to 12 hours.',
      condition: 'Good',
      categoryId: '123456789014',
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]);
  
  const handleCreateItem = (newItem) => {
    // In a real app, you would send this to your backend
    const itemWithId = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    };
    setUserItems([...userItems, itemWithId]);
    setShowCreateForm(false);
  };
  
  const handleDeleteItem = (itemId) => {
    setUserItems(userItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-sky-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <RefreshCw className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">SwapIt</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-sky-200">Home</a>
          <a href="#" className="hover:text-sky-200">About Us</a>
          <a href="#" className="hover:text-sky-200">Browse</a>
          <a href="#" className="hover:text-sky-200">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="text-sm hidden md:inline">Welcome, {user.name}</span>
          <UserCircle className="h-8 w-8 cursor-pointer" />
        </div>
      </div>
    </header>
    
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* User Profile Section */}
        <div className="md:w-1/3">
          <UserProfile user={user} />
        </div>
        
        {/* Items Section */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'myItems' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-sky-500'}`}
                onClick={() => setActiveTab('myItems')}
              >
                <Package className="h-4 w-4 mr-2" />
                My Items
              </button>
              <button 
                className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'swapHistory' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-sky-500'}`}
                onClick={() => setActiveTab('swapHistory')}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Swap History
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'myItems' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">My Items ({userItems.length})</h2>
                    <button 
                      className="bg-sky-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-sky-700 transition"
                      onClick={() => setShowCreateForm(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Item
                    </button>
                  </div>
                  
                  {showCreateForm ? (
                    <CreateItemForm
                      onSubmit={handleCreateItem} 
                      onCancel={() => setShowCreateForm(false)} 
                    />
                  ) : (
                    <ItemsList items={userItems} onDelete={handleDeleteItem} />
                  )}
                </>
              )}
              
              {activeTab === 'swapHistory' && (
                <div className="text-center py-8">
                  <RefreshCw className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Swap History</h3>
                  <p className="text-gray-500 mt-2">Your swap history will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default Profile;