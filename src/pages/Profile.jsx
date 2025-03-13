import { Package, PlusCircle, Edit, Trash2, RefreshCw, InboxIcon, SendHorizontal, MessageCircle, MessageCircleCode, LucideMessageCircle } from "lucide-react";
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
import SentRequests from "../components/SentRequests";
import { findByReceiverId, findBySenderId, updateRequest } from "../services/requestsApi";
import ReceivedRequests from "../components/ReceivedRequests";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

function Profile() {
  const [activeTab, setActiveTab] = useState("myItems");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const user = useSelector((state) => state.users.loggedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [showChatView, setShowChatView] = useState(false);

// Fetching Items
  useEffect(() => {
    async function fetchUserItems() {
      try {
        const data = await getAllUserItems();
        setUserItems(data);
      }
      catch (error) {
        toast.error('Failed to fetch items');
        console.error('Failed to fetch user items', error);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchUserItems();
  },[isLoading]);

// Fetching received requests

  useEffect(() => {
    async function fetchReceivedRequests() {
      try {
        const received = await findByReceiverId();       
        const filteredReceived = received.filter((req) => req.status !== 'rejected');   
        setReceivedRequests(filteredReceived);       
      }
      catch (error) {
        console.error('Failed to fetch received requests', error);
      }
    }
    fetchReceivedRequests();
  }, []);

// Fetching sent requests

  useEffect(()=>{
    async function fetchSentRequests(){
      try{
        const sent = await findBySenderId();
        const filteredSent = sent.filter((req) => req.status !== 'rejected');
        setSentRequests(filteredSent);
      }
      catch (error) {
        console.error('Failed to fetch sent requests', error);     
      }
    }
    fetchSentRequests();
  },[]);

 // Fetch chats
 useEffect(() => {
  async function fetchChats() {
    try {
      // Replace with your actual API call
      // const data = await getUserChats();
      // setChatList(data);
      
      // Mock data for demonstration
      setTimeout(() => {
        setChatList([
          {
            id: '1',
            user: {
              id: '101',
              first_name: 'Alice',
              last_name: 'Johnson',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            lastMessage: 'When can we meet for the exchange?',
            lastMessageTime: '2h ago',
            unread: 2,
            item: {
              id: '201',
              name: 'Vintage Camera'
            }
          },
          {
            id: '2',
            user: {
              id: '102',
              first_name: 'Bob',
              last_name: 'Smith',
              avatar: 'https://i.pravatar.cc/150?img=2'
            },
            lastMessage: 'Thanks for accepting the swap!',
            lastMessageTime: '1d ago',
            unread: 0,
            item: {
              id: '202',
              name: 'Mountain Bike'
            }
          }
        ]);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch chats', error);
    }
  }
  
  fetchChats();
}, []);

// Handling create item

  const handleCreateItem = async (newItem) => {
    try {
      const item = await createItem(newItem);
      setUserItems((prev) => ([...prev, item]));
    }
    catch (error) {
      console.error('Failed to add item', error);
      toast.error('Failed to add item');
    }
    finally {
      setIsLoading(true);
    }
    setShowCreateForm(false);
  };

  // handling delete item

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setUserItems(userItems.filter((item) => item.id !== itemId));
    }
    catch (error) {
      console.error('Failed to delete item');
      toast.error('Failed to delete item');
    }
    finally {
      setIsLoading(true);
    }
  };

  // handling edit and update item

  const handleEditItem = (itemId) => {
    setSelectedItem(userItems.find((i) => i._id == itemId));
    setShowCreateForm(false);
    setShowEditItemForm(true);
  };

  const handleUpdateItem = async (itemId, itemData) => {
    try {
      await updateItem(itemId, itemData);
    }
    catch (error) {
      console.error('Failed to update item', error);
      toast.error('Failed to update item');
    }
    finally {
      setIsLoading(true);
    }
    setShowEditItemForm(false);
  };

// handle save profile
  const handleSaveProfile = (updatedProfile) => {
    setUser({
      ...user,
      ...updatedProfile,
    });
    setShowEditProfile(false);
  };

  // handle acccept exchange request
  const handleAcceptRequest = async (requestId) => {
    try {
      await updateRequest(requestId, { status: "accepted" });
      setReceivedRequests(receivedRequests.map(req => 
        req.id === requestId ? { ...req, status: "accepted" } : req
      ));
      toast.success('Request accepted');
    }
    catch (error) {
      console.error('Failed to update request status: ', error);
      toast.error('Failed to accept request');
    }
    finally {
      setIsLoading(true);
    }
  };

  // handle refuse exchange request

  const handleRefuseRequest = async (requestId) => {
    try {
      await updateRequest(requestId, { status: "rejected" });
      setReceivedRequests(receivedRequests.filter(req => req.id !== requestId));
      toast.success('Request refused');
    }
    catch (error) {
      console.error('Failed to update request status: ', error);
      toast.error('Failed to refuse request');
    }
    finally {
      setIsLoading(true);
    }
  };

    // Handle selecting a chat from the list
    const handleSelectChat = (chat) => {
      setActiveChat(chat);
      setShowChatView(true);
    };

    // Handle closing the current chat view
    const handleCloseChat = () => {
      setShowChatView(false);
      setActiveChat(null);
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
                  className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'requests' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-sky-500'}`}
                  onClick={() => setActiveTab('requests')}
                >
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Received
                  {receivedRequests.length > 0 && (
                    <span className="ml-2 bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                      {receivedRequests.length}
                    </span>
                  )}
                </button>

                <button 
                  className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'sent' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-sky-500'}`}
                  onClick={() => setActiveTab('sent')}
                >
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Sent
                  {sentRequests.length > 0 && (
                    <span className="ml-2 bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                      {sentRequests.length}
                    </span>
                  )}
                </button>

                <button
                  className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === "messages"
                      ? "text-sky-600 border-b-2 border-sky-600"
                      : "text-gray-500 hover:text-sky-500"
                  }`}
                  onClick={() => {
                    setActiveTab("messages");
                    setShowChatView(false);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                  {chatList.reduce((count, chat) => count + chat.unread, 0) > 0 && (
                    <span className="ml-2 bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                      {chatList.reduce((count, chat) => count + chat.unread, 0)}
                    </span>
                  )}
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
                  History
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "myItems" && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        My Items ({userItems?.length})
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
                        return isLoading ? (
                          <Spinner />
                        ) : (
                          <ItemsList
                            items={userItems}
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                          />
                        );
                      }
                    })()}
                  </>
                )}
                {activeTab === 'requests' && (
                  isLoading ? (
                    <Spinner />
                  ) : receivedRequests.length>0 ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                          Received Requests ({receivedRequests.length})
                        </h2>
                      </div>
                      <ReceivedRequests
                        requests={receivedRequests}
                        onAccept={handleAcceptRequest}
                        onRefuse={handleRefuseRequest}
                      />
                    </>
                  ) :
                  (
                    <div className="text-center py-8">
                    <p className="text-gray-500">No exchange requests yet.</p>
                    <p className="text-gray-500 mt-2">When someone wants to swap with your items, requests will appear here.</p>
                  </div>
                  )
                )}

                {activeTab === 'sent' && (
                  isLoading ? (
                    <Spinner />
                  ) : sentRequests.length>0 ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                          Sent Requests ({sentRequests.length})
                        </h2>
                      </div>
                      <SentRequests
                        requests={sentRequests}
                        onStartChat={''}
                      />
                    </>
                  ):(
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't listed any items yet.</p>
                    <p className="text-gray-500 mt-2">Add your first item to start swapping!</p>
                   </div>
                  )
                )}

              {activeTab === "messages" && (
                  <>
                    {showChatView ? (
                      <Chat
                        activeChat={activeChat}
                        onClose={handleCloseChat}
                        currentUser={user}
                      />
                    ) : (
                      <ChatList
                        chatList={chatList}
                        onSelectChat={handleSelectChat}
                        activeChat={activeChat}
                      />
                    )}
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