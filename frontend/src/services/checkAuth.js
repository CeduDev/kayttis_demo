import axios from 'axios';
axios.defaults.withCredentials = true;

export const checkAuth = async () => {
  return await axios.get('/api/auth/checkAuth');
};
