import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical, Edit, Trash, User, Mail, Phone, Shield, Users } from 'lucide-react';
import { getAllUsers } from '../../services/usersApi';
import { formatDate } from '../../helpers/formatDate';

const UsersTable = () => {

  const [users, setUsers] = useState([]);

  //Fetch Users

  useEffect(()=>{
    async function fetchUsers(){
      try{
        const data = await getAllUsers();
        setUsers(data);
      }
      catch(error){
        console.error('Failed to fetch users in dashboard: ',error);
      }
    };
    fetchUsers();
  },[])
 

  return (
    <div className="p-6 max-w-full bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
            />
            <Search
              className="absolute left-3.5 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left font-medium text-xs uppercase tracking-wider text-gray-500">
                  User
                </th>
      
                <th className="px-6 py-3.5 text-left font-medium text-xs uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left font-medium text-xs uppercase tracking-wider text-gray-500">
                  Date Joined
                </th>
                <th className="px-6 py-3.5 text-right font-medium text-xs uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {users && users.length> 0 ?
              (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-3">
                          <span className="font-medium text-sm">
                            {user.first_name.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.first_name + ' ' + user.last_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
  
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${user?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                          ${user?.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}
                        ></span>
                        {user?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-red-600 transition-colors">
                          <Trash size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )
                   
              :
              (
                <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-sm font-medium text-gray-900">No users found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No users are available at this time.
                    </p>
                  </div>
                </td>
              </tr>
              )

            }
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">25</span> results
          </div>
          <div>
            <ol className="flex justify-end gap-1 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-indigo-600 bg-indigo-600 text-white"
                >
                  1
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  2
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default UsersTable;