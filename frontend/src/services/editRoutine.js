import axios from 'axios';
axios.defaults.withCredentials = true;

export const editRoutine = async (data) => {
  return await axios.post('/api/routines/edit', data);
};
