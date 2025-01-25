import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import ProfilePage from '../../components/AdminPanel/ProfilePage';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming the token is stored in local storage
    navigate('/signin'); // Redirect to the signin page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-black-500 text-center text-3xl p-10">Dashboard</h1>

      <nav className="bg-green-700 text-white py-4 shadow-lg">
        <ul className="flex justify-center space-x-4">
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeTab === 'products' ? 'bg-yellow-400 text-green-800' : ''
            }`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeTab === 'profile' ? 'bg-yellow-400 text-green-800' : ''
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
        </ul>
      </nav>

      <div className='items-center justify-center px-40 pt-2'>
      <button onClick={handleLogout} className="w-50 bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700">
          Logout
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'products' && <AdminPanel />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>
    </div>
  );
};

export default Dashboard;


