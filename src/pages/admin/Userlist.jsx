import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Userrow } from "../../components/ui/Cards";

export const Userlist = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance({
        url: '/admin/getallusers',
        method: 'GET',
      });
      setUsers(response?.data?.users || []);
    } catch (error) {
      console.log(error);
      toast.error('Failed fetching users');
    }
  };


// Function to remove a user from the state after deletion
const handleUserDeleted = (userId) => {
  setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
};



  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-4 py-6 md:px-10 lg:px-20">
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Profile</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Review</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                < Userrow key={user._id} user={user} onUserDeleted={handleUserDeleted} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
