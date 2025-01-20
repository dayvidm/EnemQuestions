import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API base URL
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', },
  withCredentials: true,
  withXSRFToken: true,

});


export default axiosInstance;