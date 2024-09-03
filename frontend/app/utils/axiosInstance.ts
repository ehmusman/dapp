import axios, { AxiosHeaders } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!
});
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //import token from local storage
    let token=localStorage.getItem('token') || '';
    //configuring header
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign("/")
    }
    return Promise.reject(error)
  },
)

export default axiosInstance;