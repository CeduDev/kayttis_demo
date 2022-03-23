import axios from 'axios';
axios.defaults.withCredentials = true;

export const setActiveRoutine = async (id) => {
  return await axios.post('/api/routines/setActiveRoutine', id);
};

export const stopActiveRoutine = async (id) => {
  return await axios.post('/api/routines/stopActiveRoutine', id);
};
