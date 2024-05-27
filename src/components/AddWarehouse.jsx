import React, { useState } from 'react';

const AddWarehouse = ({ onCancel, onSave }) => {
  const [warehouseName, setWarehouseName] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');

  const handleSave = () => {
    const newWarehouse = {
      warehouseName,
      cityName,
      stateName,
      status: 'Active', // Automatically set status to 'Active'
    };
    onSave(newWarehouse);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Add New Warehouse</h2>
      <div className="flex justify-center items-center mb-4 space-x-4">
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Warehouse</label>
          <input
            type="text"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 mt-20"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-20"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddWarehouse;
