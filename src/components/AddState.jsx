import React, { useState } from 'react';

const AddState = ({ onCancel, onSave }) => {
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');

  const handleSave = () => {
    const newState = {
      stateName,
      stateCode,
    };
    onSave(newState);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Add New State</h2>
      <div className="mb-4">
        <label className="block text-gray-700">State Name</label>
        <input
          type="text"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State Code</label>
        <input
          type="text"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          className="border rounded px-2 py-1"
        />
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

export default AddState;
