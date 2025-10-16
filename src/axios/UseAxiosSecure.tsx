import axios from 'axios';
import notify from '@/lib/notify';

const axiosSecure = axios.create({
  baseURL: 'https://book-trading-club-backend.vercel.app/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

// Global error notifications
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Request failed';
    notify.error(message);
    return Promise.reject(error);
  }
);

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
