// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosTokenInstance/AxiosTokenInstance';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ email: '', username: '', password: '' });

  useEffect(() => {
    // Fetch profile data from backend
    axiosInstance.get('/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch profile data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic here
    axiosInstance.put('/profile', profile)
      .then(response => {
        console.log('Profile updated:', response.data);
      })
      .catch(error => {
        console.error('Failed to update profile:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold">Profile Page</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={profile.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={profile.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Update Profile
      </button>
    </form>
  );
};

export default ProfilePage;
