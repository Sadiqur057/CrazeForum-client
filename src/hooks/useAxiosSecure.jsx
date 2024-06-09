import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: 'https://craze-forum-server.vercel.app/'
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`
    console.log('request stopped by interceptor')
    return config;
  }, (error) => {
    return Promise.reject(error)
  })

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const status = error.response.status;
    console.log('status error in the interceptor', status)
    // logout invalid user
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login');
    }
    return Promise.reject(error)
  })

  return axiosSecure;
};

export default useAxiosSecure;