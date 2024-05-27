import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// for login
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// fetch states
export const fetchStates = async () => {
  const response = await api.get('/states');
  return response.data;
};

//update state
export const updateState = async (id, updatedState) => {
  const response = await api.put(`/states/${id}`, updatedState);
  return response.data;
};

// Delete State
export const deleteState = async (id) => {
  const response = await api.delete(`/states/${id}`);
  return response.data;
};

// Adds a new state
export const addState = async (stateData) => {
  const response = await api.post('/states', stateData);
  return response.data;
};

// Fetch cities
export const fetchCities = async () => {
  const response = await api.get('/cities');
  return response.data;
};

// Update city
export const updateCity = async (id, updatedCity) => {
  const response = await api.put(`/cities/${id}`, updatedCity);
  return response.data;
};

// Delete city
export const deleteCity = async (id) => {
  const response = await api.delete(`/cities/${id}`);
  return response.data;
};

// Add a new city
export const addCity = async (cityData) => {
  const response = await api.post('/cities', cityData);
  return response.data;
};

// Fetch warehouses
export const fetchWarehouses = async () => {
  const response = await api.get('/warehouses');
  return response.data;
};

// Update warehouse
export const updateWarehouse = async (id, updatedWarehouse) => {
  const response = await api.put(`/warehouses/${id}`, updatedWarehouse);
  return response.data;
};

// Delete warehouse
export const deleteWarehouse = async (id) => {
  const response = await api.delete(`/warehouses/${id}`);
  return response.data;
};

// Add a new warehouse
export const addWarehouse = async (warehouseData) => {
  const response = await api.post('/warehouses', warehouseData);
  return response.data;
};

export default api;
