import axios from 'axios';
import { getLocalStorage } from 'lib/auth-utils'

export default params => {
  const token = getLocalStorage('token');
  const headers = params.headers || {};
  headers['Access-Control-Allow-Origin'] = process.env.REACT_APP_API;
  if (token) headers.Authorization = `Bearer ${token}`;
  return axios({
    ...params,
    headers
  })
}