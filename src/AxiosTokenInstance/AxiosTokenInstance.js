import axios from 'axios';

// Base Axios instance for API calls
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});


// Request interceptor for attaching token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from local storage or session storage
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token added to header:', token);  // Log to verify the token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global API response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Simply return the response if it's successful
    return response;
  },
  (error) => {
    // If the token was invalid or expired
    if (error.response.status === 401) {
      console.log('Token invalid or expired');
      localStorage.removeItem('token'); // Clear the token if it's invalid
      // Optionally, redirect the user to the login page
      window.location.href = '/signin';  // This will redirect the user to the login page
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
