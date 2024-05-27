import React, { useState } from 'react';
import { updateCity } from '../api/api';

const EditCity = ({ cityData, onBack, onSave }) => {
  const [cityName, setCityName] = useState(cityData.cityName);
  const [cityCode, setCityCode] = useState(cityData.cityCode);
  const [stateName, setStateName] = useState(cityData.stateName);
  const [status, setStatus] = useState(cityData.status);

  const handleUpdate = async () => {
    const updatedCity = { cityName, cityCode, stateName, status };
    try {
      await updateCity(cityData._id, updatedCity);
      alert('City updated successfully');
      onSave(); // Go back to the City component after a successful update
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-start p-4">
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Edit City</h2>
      <div className="flex justify-center items-center mb-4 space-x-4">
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City Name</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City Code</label>
          <input
            type="text"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2">State Name</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={handleUpdate}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-20"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditCity;
