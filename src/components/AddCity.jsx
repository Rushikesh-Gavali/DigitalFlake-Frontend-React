import React, { useState } from 'react';

const AddCity = ({ onCancel, onSave }) => {
  const [cityName, setCityName] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [stateName, setStateName] = useState('');

  const handleSave = () => {
    const newCity = {
      cityName,
      cityCode,
      stateName,
    };
    onSave(newCity);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Add New City</h2>
      <div className="mb-4 flex justify-center items-center space-x-4">
        <div>
          <label className="block text-gray-700">City Name</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="border rounded px-2 py-1 w-48"
          />
        </div>
        <div>
          <label className="block text-gray-700">City Code</label>
          <input
            type="text"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            className="border rounded px-2 py-1 w-48"
          />
        </div>
        <div>
          <label className="block text-gray-700">State Name</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="border rounded px-2 py-1 w-48"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddCity;
