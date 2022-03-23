import axios from 'axios';
axios.defaults.withCredentials = true;

export const deleteRoutine = async (data) => {
  return await axios.post('/api/routines/delete', data);
};
