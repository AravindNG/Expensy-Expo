import api from './api';

export const signUp = async (userData) => {
  
  try {
    const response = await api.post('/auth/sign-up',userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Unexpected error:', error.message);
    }
    throw error;
  }
};

export const signIn = async (userData) => {
  try {
    const response = await api.post('/auth/sign-in', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
