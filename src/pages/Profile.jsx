import { Package, PlusCircle, Edit, Trash2, RefreshCw } from "lucide-react";
import UserProfile from "../components/UserProfile";
import ItemsList from "../components/UserItemsList";
import CreateItemForm from "../components/CreateItemForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "../components/editProfileForm";
import EditItemForm from "../components/EditItemForm";
import { createItem, deleteItem, getAllUserItems, updateItem } from "../services/itemsApi";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function Profile() {
  const [activeTab, setActiveTab] = useState("myItems");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const user = useSelector((state) => state.users.loggedUser);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(()=>{

    async function fetchUserItems(){
      try{
        const data= await getAllUserItems();
        setUserItems(data);
      
      }
      catch{
        toast.error('Failed to fetch items');
        console.error('Failed to fetch user items', error);
      } 
      finally{
        setIsLoading(false);
      }   
    }
    fetchUserItems();
  },[isLoading]);

  const handleCreateItem = async (newItem) => {

    try{
      const item = await createItem(newItem);
      setUserItems((prev)=>([...prev,item]));   
    }
    catch(error){
      console.error('Failed to add item', error);
    }
    finally{
      setIsLoading(true);
    }
    
    setShowCreateForm(false);
  };

  const handleDeleteItem = async (itemId) => {
    try{
      await deleteItem(itemId); 
      setUserItems(userItems.filter((item) => item.id !== itemId));
    }
    catch(error){
      console.error('Failed to delete item');
    }
    finally{
      setIsLoading(true);
    }

  };


  const handleEditItem = (itemId) => {
    setSelectedItem(userItems.find((i)=>i._id == itemId));
    setShowCreateForm(false);
    setShowEditItemForm(true);
 
  };

 const handleUpdateItem = async (itemId,itemData)=>{
  try{
    await updateItem(itemId,itemData);
  }
  catch(error){
    console.error('Failed to update item', error);
  }
  finally{
    setIsLoading(true);
  }
  setShowEditItemForm(false);
 }

  

  const handleSaveProfile = (updatedProfile) => {
    setUser({
      ...user,
      ...updatedProfile,
    });
    setShowEditProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 mt-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Profile Section */}
          <div className="md:w-1/3">
            {showEditProfile ? (
              <EditProfileForm
                user={user}
                onSave={handleSaveProfile}
                onCancel={() => setShowEditProfile(false)}
              />
            ) : (
              <UserProfile
                user={user}
                onEditProfile={() => setShowEditProfile(true)}
              />
            )}
          </div>

          {/* Items Section */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === "myItems"
                      ? "text-sky-600 border-b-2 border-sky-600"
                      : "text-gray-500 hover:text-sky-500"
                  }`}
                  onClick={() => setActiveTab("myItems")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  My Items
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === "swapHistory"
                      ? "text-sky-600 border-b-2 border-sky-600"
                      : "text-gray-500 hover:text-sky-500"
                  }`}
                  onClick={() => setActiveTab("swapHistory")}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Swap History
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "myItems" && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        My Items ({userItems.length})
                      </h2>
                      <button
                        className="bg-sky-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-sky-700 transition"
                        onClick={() => setShowCreateForm(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Item
                      </button>
                    </div>

                    {(() => {
                      if (showCreateForm) {
                        return (
                          <CreateItemForm
                            onSubmit={handleCreateItem}
                            onCancel={() => setShowCreateForm(false)}
                          />
                        );
                      } else if (showEditItemForm) {
                        return (
                          <EditItemForm
                            item={selectedItem}
                            onSubmit={handleUpdateItem}
                            onCancel={() => setShowEditItemForm(false)}
                          />
                        );
                      } else {
                        return (

                          isLoading ?

                          <Spinner/>

                         : <ItemsList
                            items={userItems}
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                          />

                        );
                      }
                    })()}
                  </>
                )}

                {activeTab === "swapHistory" && (
                  <div className="text-center py-8">
                    <RefreshCw className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">
                      Swap History
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Your swap history will appear here
                    </p>
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
