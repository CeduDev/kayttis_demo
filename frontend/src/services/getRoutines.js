import axios from 'axios';
axios.defaults.withCredentials = true;

export const getRoutines = async (data) => {
  return await axios.get('/api/routines/', data);
};
