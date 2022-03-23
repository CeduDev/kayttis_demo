import axios from 'axios';
axios.defaults.withCredentials = true;

export const setActiveBreak = async (data) => {
  return await axios.post('/api/routines/setActiveBreak', data);
};
