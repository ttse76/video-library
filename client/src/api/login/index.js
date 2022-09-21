import axios from 'axios';

const BaseUrl = `${process.env.API_BASE_URL}/api/user`;

export const authenticate = async ({ username, password }) => {
  return axios.post(`${BaseUrl}/authenticate`, { username, password }).then(res => res.data);
};