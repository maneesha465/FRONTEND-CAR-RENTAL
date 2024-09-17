import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUser({
      ...user,
      profilePic: e.target.files[0], // Capture the file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to backend
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    
    if (user.profilePic) {
      formData.append('profilePic', user.profilePic); // Append the file
    }

    try {
      await axiosInstance.put(`/user/edit-user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the content type is set to form data
        },
      });
      toast.success('User updated successfully');
      navigate('/user/profile');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className='flex flex-col items-center container mx-auto mt-10 p-5'>
        <h2 className="text-center mb-4 text-3xl font-bold">EDIT PROFILE</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <input 
              type="text" 
              name="name" 
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              required
              className="input input-bordered input-secondary mx-auto w-[500px]" 
            />
          </div>
          <div className="mt-14">
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="input input-bordered input-secondary mx-auto w-[500px]" 
            />
          </div>
          <div className="mt-14">
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone" 
              value={user.phone} // Make sure this is "phone"
              onChange={handleChange}
              className="input input-bordered input-secondary mx-auto w-[500px]" 
            />
          </div>
          <div className="mt-14">
            <input 
              type="file" 
              placeholder="ProfilePic" 
              onChange={handleImageChange}
              className="input input-bordered input-secondary mx-auto w-[500px]" 
            />
          </div>
          <div className="mt-14">
            <button type="submit" className="btn btn-outline btn-secondary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
