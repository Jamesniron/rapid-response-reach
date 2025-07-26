import axios from 'axios';

const API_BASE_URL = 'http://localhost:5046/api';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/User/login?email=${email}&password=${password}`, {
  });

  return response.data;
};

export const registorUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/User`, {
    name,
    email,
    password
  });

  return response.data;
}