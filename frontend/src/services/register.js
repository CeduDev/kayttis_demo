import axios from 'axios';
axios.defaults.withCredentials = true;

export const register = async (data) => {
  return await axios.post('/api/auth/register', data);
};
