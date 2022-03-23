import axios from 'axios';
axios.defaults.withCredentials = true;

export const setActiveRoutine = async () => {
  return await axios.post('/api/routines/setActiveRoutine');
};
