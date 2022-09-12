import axios from 'axios'
import { BASE_URL } from '../config';

export const API_PREFIX = 'api';

export const axiosApi = axios.create({
  baseURL: `${BASE_URL}${API_PREFIX}`,
})


axiosApi.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return handleError(error)
  }
)

export async function get(url: string) {
  return await axiosApi.get(url).then(response => response)
}

export async function patch(url: string, data : any) {
  return await axiosApi.patch(url, { ...data })
    .then(response => response)
    .catch(error => error.response);
}

export async function post(url : string, data : any) {
  return axiosApi
    .post(url, { ...data }, )
    .then(response => response)
    .catch(error => error.response);
}

export async function put(url: string, data :any) {
  return axiosApi
    .put(url, { ...data })
    .then(response => response)
}

export async function del(url: string, config = {}) {
  return await axiosApi
    .delete(url)
    .then(response => response)
}

const handleError = (error : any) => {
  if(error.response){
    switch(error.response.status){
    case 401:
      return Promise.reject(error)
    case 500:
      window.location.href = '/pages-500'
      return Promise.reject(error)
  
    default:
      return Promise.reject(error)
    }
  }else{
    
    return Promise.reject(error)
  }
}
export function isSuccessResp(status : number) {
  //2xx Status Codes [Success]
  if(status >= 200 && status <= 299){
    return true;
  }
  return false;
}

