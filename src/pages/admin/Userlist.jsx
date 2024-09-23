import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { UserCard } from '../../components/ui/Cards';
import toast from 'react-hot-toast';

export const Userlist = () => {
  const [users, setUsers] = useState([]); // Ensure the initial state is an array

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance({
        url: '/admin/getallusers',
        method: 'GET',
      });

      console.log('response=====', response);
      // Assuming the data is inside response.data.users
      setUsers(response?.data?.users || []); // Set users to an empty array if data is not present
    } catch (error) {
      console.log(error);
      toast.error('Failed fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-4 py-6 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};
