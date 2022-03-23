import axios from 'axios';
axios.defaults.withCredentials = true;

export const addRoutine = async (data) => {
  return await axios.post('/api/routines/add', data);
};
