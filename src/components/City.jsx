import React, { useEffect, useState } from 'react';
import { fetchCities, deleteCity, addCity } from '../api/api';
import EditCity from './EditCity';
import DeleteCityConfirmation from './DeleteCityConfirmation';
import AddCity from './AddCity';

const City = () => {
  const [cities, setCities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data.data); // Assuming the response has a data field containing the cities
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    getCities();
  }, []);

  const handleEdit = (city) => {
    setSelectedCity(city);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedCity(null);
  };

  const handleDelete = (city) => {
    setCityToDelete(city);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    if (cityToDelete) {
      try {
        await deleteCity(cityToDelete._id);
        alert('City deleted successfully');
        setCities(cities.filter((city) => city._id !== cityToDelete._id));
      } catch (error) {
        console.error('Error deleting city:', error);
      } finally {
        setIsDeleting(false);
        setCityToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setCityToDelete(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveAdd = async (newCity) => {
    try {
      const addedCity = await addCity(newCity);
      alert('City added successfully');
      setCities([...cities, addedCity]);
    } catch (error) {
      console.error('Error adding city:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isEditing && selectedCity) {
    return <EditCity cityData={selectedCity} onBack={handleBack} onSave={handleBack} />;
  }

  if (isAdding) {
    return <AddCity onCancel={handleCancelAdd} onSave={handleSaveAdd} />;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">This is City Component</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Add City
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">City Name</th>
              <th className="px-4 py-2 border-b">City Code</th>
              <th className="px-4 py-2 border-b">State Name</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {cities.map((city) => (
              <tr key={city._id}>
                <td className="px-4 py-2 border-b">{city._id}</td>
                <td className="px-4 py-2 border-b">{city.cityName}</td>
                <td className="px-4 py-2 border-b">{city.cityCode}</td>
                <td className="px-4 py-2 border-b">{city.stateName}</td>
                <td className="px-4 py-2 border-b">{city.status}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(city)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(city)}
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
        <DeleteCityConfirmation
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default City;
