import axios from 'axios';
import { api } from '../config/urlConfig';


const axiosIntance = axios.create({
    baseURL: api,
    headers: {
      'Content-Type': 'multipart/form-data',
  }
});
const getTokenSilently = ()=>{
    return localStorage.getItem('token')
  }
axiosIntance.interceptors.request.use(async(req) => { 
    const token = await getTokenSilently();
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });
export default axiosIntance