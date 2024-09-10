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
    <div className="px-20 py-10">
      {/* <h1 className="font-bold text-4xl my-5">List of Users</h1> */}
      <div className="grid grid-cols-3 gap-10">
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
