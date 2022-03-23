import axios from 'axios';
axios.defaults.withCredentials = true;

export const setBreak = async (data) => {
  return await axios.post('/api/routines/setActiveBreak', data);
};
