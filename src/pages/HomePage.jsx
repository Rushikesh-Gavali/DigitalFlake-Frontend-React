import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Home from '../components/Home';
import State from '../components/State';
import City from '../components/City';
import Warehouse from '../components/Warehouse';
import EditState from '../components/EditState';
import EditCity from '../components/EditCity';
import EditWarehouse from '../components/EditWarehouse';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('Home'); // State to track selected option
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Function to render appropriate component based on selected option
  const renderComponent = () => {
    switch (selectedOption) {
      case 'Home':
        return <Home />;
      case 'State':
        return <State />;
      case 'City':
        return <City />;
      case 'Warehouse':
        return <Warehouse />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-purple-700 text-white">
        {/* Company Name */}
        <div className="flex items-center">
          <span className="font-bold text-lg">DigitalFlex</span>
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition duration-300"
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Navigation */}
        <div className="w-1/5 bg-gray-200">
          <ul className="py-4">
            <li
              className={`py-2 px-4 cursor-pointer hover:bg-gray-300 ${selectedOption === 'Home' ? 'bg-yellow-100' : ''}`}
              onClick={() => setSelectedOption('Home')}
            >
              Home
            </li>
            <li
              className={`py-2 px-4 cursor-pointer hover:bg-gray-300 ${selectedOption === 'State' ? 'bg-yellow-100' : ''}`}
              onClick={() => setSelectedOption('State')}
            >
              State
            </li>
            <li
              className={`py-2 px-4 cursor-pointer hover:bg-gray-300 ${selectedOption === 'City' ? 'bg-yellow-100' : ''}`}
              onClick={() => setSelectedOption('City')}
            >
              City
            </li>
            <li
              className={`py-2 px-4 cursor-pointer hover:bg-gray-300 ${selectedOption === 'Warehouse' ? 'bg-yellow-100' : ''}`}
              onClick={() => setSelectedOption('Warehouse')}
            >
              Warehouse
            </li>
          </ul>
        </div>
        {/* Main Content Area */}
        <div className="w-4/5 bg-white shadow-md rounded-md p-4">
          <Routes>
            <Route path="/" element={renderComponent()} />
            <Route path="/edit-state" element={<EditState />} />
            <Route path="/edit-city" element={<EditCity />} />
            <Route path="/edit-warehouse" element={<EditWarehouse />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
