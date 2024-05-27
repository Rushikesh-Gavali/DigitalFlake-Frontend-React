import React, { useEffect, useState } from 'react';
import { fetchStates, deleteState, addState } from '../api/api';
import EditState from './EditState';
import DeleteStateConfirmation from './DeleteStateConfirmation';
import AddState from './AddState';

const State = () => {
  const [states, setStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stateToDelete, setStateToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      try {
        const data = await fetchStates();
        setStates(data.data); // Assuming the response has a data field containing the states
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    getStates();
  }, []);

  const handleEdit = (state) => {
    setSelectedState(state);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedState(null);
  };

  const handleDelete = (state) => {
    setStateToDelete(state);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    if (stateToDelete) {
      try {
        await deleteState(stateToDelete._id);
        alert('State deleted successfully');
        setStates(states.filter((state) => state._id !== stateToDelete._id));
      } catch (error) {
        console.error('Error deleting state:', error);
      } finally {
        setIsDeleting(false);
        setStateToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setStateToDelete(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveAdd = async (newState) => {
    try {
      const addedState = await addState(newState);
      alert('State added successfully');
      setStates([...states, addedState]);
    } catch (error) {
      console.error('Error adding state:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isEditing && selectedState) {
    return <EditState stateData={selectedState} onBack={handleBack} onSave={handleBack} />;
  }

  if (isAdding) {
    return <AddState onCancel={handleCancelAdd} onSave={handleSaveAdd} />;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">This is State Component</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Add State
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">State Name</th>
              <th className="px-4 py-2 border-b">State Code</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {states.map((state) => (
              <tr key={state._id}>
                <td className="px-4 py-2 border-b">{state._id}</td>
                <td className="px-4 py-2 border-b">{state.stateName}</td>
                <td className="px-4 py-2 border-b">{state.stateCode}</td>
                <td className={`px-4 py-2 border-b ${state.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{state.status}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(state)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(state)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDeleting && (
        <DeleteStateConfirmation
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default State;
