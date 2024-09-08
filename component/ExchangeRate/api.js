// api.js

import axios from 'axios';

const API_KEY = '7d089d07e1fa0f621e6e0c24';
const BASE_URL =  'https://v6.exchangerate-api.com/v6/'; // Replace this with your actual API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Example GET request
export const fetchData = async () => {
  try {
    const response = await api.get('/endpoint'); // Replace '/endpoint' with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example POST request
export const postData = async (data) => {
  try {
    const response = await api.post('/endpoint', data); // Replace '/endpoint' with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Add more functions for different types of requests (PUT, DELETE, etc.) as needed
