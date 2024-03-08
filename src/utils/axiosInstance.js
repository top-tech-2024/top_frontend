import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    // Additional default config
});

// Add a response interceptor
axiosInstance.interceptors.response.use(response => {
    // Any status code within the range of 2xx cause this function to trigger
    return response;
}, error => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
        // Redirect to login page
        window.location = '/TOP24_Demo_Frontend/'; // Or use useHistory hook for navigation in a React component
    }
    return Promise.reject(error);
});

export default axiosInstance;