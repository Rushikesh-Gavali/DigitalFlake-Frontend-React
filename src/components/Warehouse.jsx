import React, { useEffect, useState } from 'react';
import { fetchWarehouses, deleteWarehouse, addWarehouse } from '../api/api';
import EditWarehouse from './EditWarehouse';
import DeleteWarehouseConfirmation from './DeleteWarehouseConfirmation';
import AddWarehouse from './AddWarehouse';

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const data = await fetchWarehouses();
        setWarehouses(data.data); // Assuming the response has a data field containing the warehouses
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    getWarehouses();
  }, []);

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedWarehouse(null);
  };

  const handleDelete = (warehouse) => {
    setWarehouseToDelete(warehouse);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    if (warehouseToDelete) {
      try {
        await deleteWarehouse(warehouseToDelete._id);
        alert('Warehouse deleted successfully');
        setWarehouses(warehouses.filter((warehouse) => warehouse._id !== warehouseToDelete._id));
      } catch (error) {
        console.error('Error deleting warehouse:', error);
      } finally {
        setIsDeleting(false);
        setWarehouseToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setWarehouseToDelete(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveAdd = async (newWarehouse) => {
    try {
      const addedWarehouse = await addWarehouse(newWarehouse);
      alert('Warehouse added successfully');
      setWarehouses([...warehouses, addedWarehouse]);
    } catch (error) {
      console.error('Error adding warehouse:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isEditing && selectedWarehouse) {
    return <EditWarehouse warehouseData={selectedWarehouse} onBack={handleBack} onSave={handleBack} />;
  }

  if (isAdding) {
    return <AddWarehouse onCancel={handleCancelAdd} onSave={handleSaveAdd} />;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">This is Warehouse Component</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Warehouse
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Warehouse Name</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">State</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {warehouses.map((warehouse) => (
              <tr key={warehouse._id}>
                <td className="px-4 py-2 border-b">{warehouse._id}</td>
                <td className="px-4 py-2 border-b">{warehouse.warehouseName}</td>
                <td className="px-4 py-2 border-b">{warehouse.cityName}</td>
                <td className="px-4 py-2 border-b">{warehouse.stateName}</td>
                <td className="px-4 py-2 border-b">{warehouse.status}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(warehouse)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(warehouse)}
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
        <DeleteWarehouseConfirmation
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Warehouse;
