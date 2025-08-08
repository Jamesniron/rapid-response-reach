import axios from 'axios';

 const API_BASE_URL = 'https://localhost:7032/api';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/User/login`, {
    email,
    password
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

// export const getallUsers = async () => {
//   const response = await axios.get(`${API_BASE_URL}/User`);

//   return response.data;
// }