import axios from 'axios';
axios.defaults.withCredentials = true;

export const login = async (data) => {
  return await axios.post('/api/auth/login', data);
};
