import axios from 'axios';
axios.defaults.withCredentials = true;

export const logout = async () => {
  return await axios.get('/api/auth/logout');
};
