import axios from 'axios';
axios.defaults.withCredentials = true;

export const setActiveRoutine = async (id) => {
  return await axios.post('/api/routines/setActiveRoutine', id);
};

export const stopActiveRoutine = async (id) => {
  return await axios.post('/api/routines/stopActiveRoutine', id);
};

export const getActiveRoutine = async () => {
  return await axios.get('/api/routines/getActiveRoutine');
};
