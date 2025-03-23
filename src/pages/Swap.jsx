import React, {useState, useEffect} from 'react';
import {
  Share2,
  ArrowLeft,
  Info,
  Shield,
  ChevronRight,
  Star,
  Bell,
  Clock,
  Users,
} from 'lucide-react';
import SwapProposal from '../components/SwapProposal';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUserItems, getOneItem } from '../services/itemsApi';
import { createRequest } from '../services/requestsApi';
import { toast } from 'react-toastify';

function Swap () {

  const [animateBackground, setAnimateBackground] = useState (false);
  const {targetItemId} = useParams();
  const [targetItem, setTargetItem] = useState(null);
  const [senderItems, setSenderItems] = useState([]);
  const navigate = useNavigate();


  useEffect (() => {
    async function fetchSenderItems(){
      try{
        const data = await getAllUserItems();
        setSenderItems(data);
      }
      catch(error){
        console.error('Failed to fetch sender items: ', error);
      }
    } 
    fetchSenderItems();
    setAnimateBackground (true);
  }, []);

  useEffect(()=>{
    async function fetchItem(){
      try{
        const  item = await getOneItem(targetItemId);
        setTargetItem(item);
      }
      catch(error){
        console.error('Failed to fetch item');
      }
    }
    fetchItem();
  },[targetItemId]);



  const handleSwapSubmit = async(data)=>{
    try{
      await createRequest(data);
      navigate('/');     
    }
    catch(error){
      console.error('Failed to submit an exchange offer');
       toast.error('Something went wrong!',{theme: "colored"});
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-purple-50 overflow-x-hidden">
      <div className="fixed top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-300/10 to-purple-300/20 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-200/10 to-sky-300/15 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3" />

      {/* Main content */}
      <div className="relative w-full mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <button className="flex items-center text-gray-600 hover:text-sky-600 transition-colors group">
            <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm group-hover:bg-sky-100 transition-all">
              <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="ml-2 text-sm font-medium">
              Back to Item Details
            </span>
          </button>
        </div>

        {/*  Context Banner */}
        <div
          className={`bg-gradient-to-r from-white to-sky-50 border border-sky-100 rounded-xl shadow-lg mb-8 overflow-hidden max-w-7xl mx-auto transform transition-all duration-700 ${animateBackground ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between relative">
            <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-br from-sky-100/40 to-sky-200/30 blur-md" />

            <div className="relative z-10 max-w-full">
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-full p-2 shadow-md">
                  <Share2 className="h-5 w-5 text-white" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-gray-900">
                  Swap Proposal
                </h2>
              </div>

            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
              <div className="flex">
                <button
                  className={`relative py-5 px-8 focus:outline-none transition-all duration-300 text-sky-600 font-medium}`}
                  onClick={''}
                >
                  Make Offer
              
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-600 to-sky-600" />
                </button>
       
              </div>
            </div>

      

            <div className="p-6 sm:p-8">
      
               <SwapProposal
                senderItems={senderItems}
                targetItem={targetItem} 
                submit={handleSwapSubmit}
                     
              /> 
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            <div className="bg-gradient-to-br from-white to-purple-50 p-6 sm:p-7 rounded-xl shadow-lg border border-purple-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-gradient-to-br from-purple-100/20 to-sky-200/10 blur-md group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-semibold text-gray-900 mb-5 relative z-10">
                Smart Swap Tips
              </h3>
              <div className="space-y-5 relative z-10">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
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
                      <svg
                        className="h-5 w-5 text-sky-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
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
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
